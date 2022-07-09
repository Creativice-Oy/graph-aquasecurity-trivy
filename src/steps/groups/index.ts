import {
  createDirectRelationship,
  Entity,
  IntegrationStep,
  IntegrationStepExecutionContext,
  RelationshipClass,
} from '@jupiterone/integration-sdk-core';
import { createAPIClient } from '../../client';

import { IntegrationConfig } from '../../config';
import { ACCOUNT_ENTITY_KEY } from '../account';
import { Steps, Entities, Relationships } from '../constants';
import { createUserKey } from '../users/converter';
import { createGroupEntity } from './converter';

export async function fetchGroups({
  instance,
  jobState,
}: IntegrationStepExecutionContext<IntegrationConfig>) {
  const apiClient = createAPIClient(instance.config);
  const accountEntity = (await jobState.getData(ACCOUNT_ENTITY_KEY)) as Entity;

  await apiClient.iterateGroups(async (group) => {
    const groupEntity = await jobState.addEntity(createGroupEntity(group));

    await jobState.addRelationship(
      createDirectRelationship({
        from: accountEntity,
        to: groupEntity,
        _class: RelationshipClass.HAS,
      }),
    );
  });
}

export async function buildGroupUserRelationships({
  instance,
  jobState,
}: IntegrationStepExecutionContext<IntegrationConfig>) {
  const apiClient = createAPIClient(instance.config);

  await jobState.iterateEntities(
    { _type: Entities.GROUP._type },
    async (groupEntity) => {
      const group = await apiClient.getGroup(groupEntity.id as string);

      for (const user of group.data.users) {
        const userEntity = await jobState.findEntity(
          createUserKey(user.id.toString()),
        );

        if (userEntity) {
          await jobState.addRelationship(
            createDirectRelationship({
              from: groupEntity,
              to: userEntity,
              _class: RelationshipClass.HAS,
            }),
          );
        }
      }
    },
  );
}

export const groupSteps: IntegrationStep<IntegrationConfig>[] = [
  {
    id: Steps.GROUPS,
    name: 'Fetch Groups',
    entities: [Entities.GROUP],
    relationships: [Relationships.ACCOUNT_HAS_GROUP],
    dependsOn: [Steps.ACCOUNT],
    executionHandler: fetchGroups,
  },
  {
    id: Steps.GROUP_USER_RELATIONSHIPS,
    name: 'Build Group -> User Relationships',
    entities: [],
    relationships: [Relationships.GROUP_HAS_USER],
    dependsOn: [Steps.GROUPS, Steps.USERS],
    executionHandler: buildGroupUserRelationships,
  },
];
