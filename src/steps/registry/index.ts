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
import { createRegistryEntity } from './converter';

export async function fetchRegistries({
  instance,
  jobState,
}: IntegrationStepExecutionContext<IntegrationConfig>) {
  const apiClient = createAPIClient(instance.config);
  const accountEntity = (await jobState.getData(ACCOUNT_ENTITY_KEY)) as Entity;
  const account = getRawData<AquasecTrivyAccount>(accountEntity);

  if (account) {
    await apiClient.iterateRegistries(
      account.data.ese_url,
      async (registry) => {
        const registryEntity = await jobState.addEntity(
          createRegistryEntity(registry),
        );

        await jobState.addRelationship(
          createDirectRelationship({
            from: accountEntity,
            to: registryEntity,
            _class: RelationshipClass.HAS,
          }),
        );
      },
    );
  }
}

export const registrySteps: IntegrationStep<IntegrationConfig>[] = [
  {
    id: Steps.REGISTRIES,
    name: 'Fetch Registries',
    entities: [Entities.REGISTRY],
    relationships: [Relationships.ACCOUNT_HAS_REGISTRY],
    dependsOn: [Steps.ACCOUNT],
    executionHandler: fetchRegistries,
  },
];
