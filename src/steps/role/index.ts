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
import { createRoleEntity } from './converter';

export async function fetchRoles({
  instance,
  jobState,
}: IntegrationStepExecutionContext<IntegrationConfig>) {
  const apiClient = createAPIClient(instance.config);
  const accountEntity = (await jobState.getData(ACCOUNT_ENTITY_KEY)) as Entity;
  const account = getRawData<AquasecTrivyAccount>(accountEntity);

  if (account) {
    await apiClient.iterateRoles(account.data.ese_url, async (role) => {
      const roleEntity = await jobState.addEntity(createRoleEntity(role));

      await jobState.addRelationship(
        createDirectRelationship({
          from: accountEntity,
          to: roleEntity,
          _class: RelationshipClass.HAS,
        }),
      );

      await jobState.iterateEntities(
        { _type: Entities.USER._type },
        async (userEntity) => {
          if (userEntity.email === role.author)
            await jobState.addRelationship(
              createDirectRelationship({
                from: userEntity,
                to: roleEntity,
                _class: RelationshipClass.CREATED,
              }),
            );
        },
      );
    });
  }
}

export const roleSteps: IntegrationStep<IntegrationConfig>[] = [
  {
    id: Steps.ROLES,
    name: 'Fetch Roles',
    entities: [Entities.ROLE],
    relationships: [
      Relationships.ACCOUNT_HAS_ROLE,
      Relationships.USER_CREATED_ROLE,
    ],
    dependsOn: [Steps.ACCOUNT, Steps.USERS],
    executionHandler: fetchRoles,
  },
];
