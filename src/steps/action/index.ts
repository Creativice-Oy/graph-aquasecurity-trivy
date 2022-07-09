import {
  createDirectRelationship,
  Entity,
  getRawData,
  IntegrationStep,
  IntegrationStepExecutionContext,
  RelationshipClass,
} from '@jupiterone/integration-sdk-core';
import { createAPIClient } from '../../client';

import { IntegrationConfig } from '../../config';
import { AquasecTrivyAccount } from '../../types';
import { ACCOUNT_ENTITY_KEY } from '../account';
import { Steps, Entities, Relationships } from '../constants';
import { createActionEntity } from './converter';

export async function fetchActions({
  instance,
  jobState,
}: IntegrationStepExecutionContext<IntegrationConfig>) {
  const apiClient = createAPIClient(instance.config);
  const accountEntity = (await jobState.getData(ACCOUNT_ENTITY_KEY)) as Entity;
  const account = getRawData<AquasecTrivyAccount>(accountEntity);
  const methods = ['read', 'write'];

  if (account) {
    await apiClient.iterateActions(account.data.ese_url, async (action) => {
      for (const method of methods) {
        if (
          (method === 'write' && action.has_write_access) ||
          method === 'read'
        ) {
          const actionEntity = await jobState.addEntity(
            createActionEntity(method, action),
          );

          await jobState.addRelationship(
            createDirectRelationship({
              from: accountEntity,
              to: actionEntity,
              _class: RelationshipClass.HAS,
            }),
          );
        }
      }
    });
  }
}

export const actionSteps: IntegrationStep<IntegrationConfig>[] = [
  {
    id: Steps.ACTION,
    name: 'Fetch Actions',
    entities: [Entities.ACTION],
    relationships: [Relationships.ACCOUNT_HAS_ACTION],
    dependsOn: [Steps.ACCOUNT],
    executionHandler: fetchActions,
  },
];
