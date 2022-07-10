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

export const repositoryteps: IntegrationStep<IntegrationConfig>[] = [
  {
    id: Steps.REPOSITORIES,
    name: 'Fetch Repositories',
    entities: [Entities.REPOSITORY],
    relationships: [Relationships.ACCOUNT_HAS_REPOSITORY],
    dependsOn: [Steps.ACCOUNT],
    executionHandler: fetchRepositories,
  },
];
