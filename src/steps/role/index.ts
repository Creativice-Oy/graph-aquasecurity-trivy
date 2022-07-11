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
import { createUserKey } from '../users/converter';
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
    });
  }
}

export async function buildRoleUserRelationships({
  jobState,
}: IntegrationStepExecutionContext<IntegrationConfig>) {
  await jobState.iterateEntities(
    { _type: Entities.ROLE._type },
    async (roleEntity) => {
      const userEntity = await jobState.findEntity(
        createUserKey(roleEntity.author as string),
      );

      if (userEntity) {
        await jobState.addRelationship(
          createDirectRelationship({
            from: userEntity,
            to: roleEntity,
            _class: RelationshipClass.CREATED,
          }),
        );
      }
    },
  );
}

export const roleSteps: IntegrationStep<IntegrationConfig>[] = [
  {
    id: Steps.ROLES,
    name: 'Fetch Roles',
    entities: [Entities.ROLE],
    relationships: [Relationships.ACCOUNT_HAS_ROLE],
    dependsOn: [Steps.ACCOUNT],
    executionHandler: fetchRoles,
  },
  {
    id: Steps.ROLE_USER_RELATIONSHIPS,
    name: 'Build Role -> User Relationships',
    entities: [],
    relationships: [Relationships.USER_CREATED_ROLE],
    dependsOn: [Steps.ROLES, Steps.USERS],
    executionHandler: buildRoleUserRelationships,
  },
];
