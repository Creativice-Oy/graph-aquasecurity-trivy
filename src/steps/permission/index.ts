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
import { createActionKey } from '../action/converter';
import { Steps, Entities, Relationships } from '../constants';
import { createPermissionEntity } from './converter';

export async function fetchPermissions({
  instance,
  jobState,
}: IntegrationStepExecutionContext<IntegrationConfig>) {
  const apiClient = createAPIClient(instance.config);
  const accountEntity = (await jobState.getData(ACCOUNT_ENTITY_KEY)) as Entity;
  const account = getRawData<AquasecTrivyAccount>(accountEntity);

  if (account) {
    await apiClient.iteratePermissions(
      account.data.ese_url,
      async (permission) => {
        const permissionEntity = await jobState.addEntity(
          createPermissionEntity(permission),
        );

        await jobState.addRelationship(
          createDirectRelationship({
            from: accountEntity,
            to: permissionEntity,
            _class: RelationshipClass.HAS,
          }),
        );

        await jobState.iterateEntities(
          { _type: Entities.USER._type },
          async (userEntity) => {
            if (userEntity.email === permission.author)
              await jobState.addRelationship(
                createDirectRelationship({
                  from: userEntity,
                  to: permissionEntity,
                  _class: RelationshipClass.CREATED,
                }),
              );
          },
        );
      },
    );
  }
}

export async function buildPermissionActionRelationship({
  jobState,
}: IntegrationStepExecutionContext<IntegrationConfig>) {
  await jobState.iterateEntities(
    { _type: Entities.PERMISSION._type },
    async (permissionEntity) => {
      for (const action of permissionEntity.actions as string[]) {
        const actionEntity = await jobState.findEntity(createActionKey(action));

        if (actionEntity) {
          await jobState.addRelationship(
            createDirectRelationship({
              from: permissionEntity,
              to: actionEntity,
              _class: RelationshipClass.HAS,
            }),
          );
        }
      }
    },
  );
}

export const permissionSteps: IntegrationStep<IntegrationConfig>[] = [
  {
    id: Steps.PERMISSION,
    name: 'Fetch Permissions',
    entities: [Entities.PERMISSION],
    relationships: [
      Relationships.ACCOUNT_HAS_PERMISSION,
      Relationships.USER_CREATED_PERMISSION,
    ],
    dependsOn: [Steps.ACCOUNT, Steps.USERS],
    executionHandler: fetchPermissions,
  },
  {
    id: Steps.PERMISSION_ACTION_RELATIONSHIPS,
    name: 'Build Permission -> Action Relationship',
    entities: [],
    relationships: [Relationships.PERMISSION_HAS_ACTION],
    dependsOn: [Steps.PERMISSION, Steps.ACTION],
    executionHandler: buildPermissionActionRelationship,
  },
];
