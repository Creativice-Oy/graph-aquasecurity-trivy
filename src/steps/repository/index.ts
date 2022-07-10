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
import { createRegistryKey } from '../registry/converter';
import { createUserKey } from '../users/converter';
import { createRepositoryEntity } from './converter';

export async function fetchRepositories({
  instance,
  jobState,
}: IntegrationStepExecutionContext<IntegrationConfig>) {
  const apiClient = createAPIClient(instance.config);
  const accountEntity = (await jobState.getData(ACCOUNT_ENTITY_KEY)) as Entity;
  const account = getRawData<AquasecTrivyAccount>(accountEntity);

  if (account) {
    await apiClient.iterateRepositories(
      account.data.ese_url,
      async (repository) => {
        const repositoryEntity = await jobState.addEntity(
          createRepositoryEntity(repository),
        );

        await jobState.addRelationship(
          createDirectRelationship({
            from: accountEntity,
            to: repositoryEntity,
            _class: RelationshipClass.HAS,
          }),
        );
      },
    );
  }
}

export async function buildRepositoryUserRelationships({
  instance,
  jobState,
}: IntegrationStepExecutionContext<IntegrationConfig>) {
  await jobState.iterateEntities(
    { _type: Entities.REPOSITORY._type },
    async (repositoryEntity) => {
      const userEntity = await jobState.findEntity(
        createUserKey(repositoryEntity.author as string),
      );

      if (userEntity) {
        await jobState.addRelationship(
          createDirectRelationship({
            from: userEntity,
            to: repositoryEntity,
            _class: RelationshipClass.CREATED,
          }),
        );
      }
    },
  );
}

export async function buildRepositoryRegistryRelationships({
  jobState,
}: IntegrationStepExecutionContext<IntegrationConfig>) {
  await jobState.iterateEntities(
    { _type: Entities.REPOSITORY._type },
    async (repositoryEntity) => {
      const registryEntity = await jobState.findEntity(
        createRegistryKey(repositoryEntity.registry as string),
      );

      if (registryEntity) {
        await jobState.addRelationship(
          createDirectRelationship({
            from: registryEntity,
            to: repositoryEntity,
            _class: RelationshipClass.HAS,
          }),
        );
      }
    },
  );
}

export const repositoryteps: IntegrationStep<IntegrationConfig>[] = [
  {
    id: Steps.REPOSITORIES,
    name: 'Fetch Repositories',
    entities: [Entities.REPOSITORY],
    relationships: [Relationships.ACCOUNT_HAS_REPOSITORY],
    dependsOn: [Steps.ACCOUNT],
    executionHandler: fetchRepositories,
  },
  {
    id: Steps.REPOSITORY_USER_RELATIONSHIPS,
    name: 'Build Repository -> User Relationships',
    entities: [],
    relationships: [Relationships.USER_CREATED_REPOSITORY],
    dependsOn: [Steps.REPOSITORIES, Steps.USERS],
    executionHandler: buildRepositoryUserRelationships,
  },
  {
    id: Steps.REPOSITORY_REGISTRY_RELATIONSHIPS,
    name: 'Build Repository -> Registry Relationships',
    entities: [],
    relationships: [Relationships.REGISTRY_HAS_REPOSITORY],
    dependsOn: [Steps.REPOSITORIES, Steps.REGISTRIES],
    executionHandler: buildRepositoryRegistryRelationships,
  },
];
