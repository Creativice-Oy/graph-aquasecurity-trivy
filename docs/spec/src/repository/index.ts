import { RelationshipClass, StepSpec } from '@jupiterone/integration-sdk-core';
import { IntegrationConfig } from '../../../../src/config';

export const repositorySpec: StepSpec<IntegrationConfig>[] = [
  {
    /**
     * ENDPOINT: n/a
     * PATTERN: Iterate entities
     */
    id: 'fetch-repositories',
    name: 'Fetch Repositories',
    entities: [
      {
        resourceName: 'Repository',
        _type: 'aquasec_trivy_repository',
        _class: ['Repository'],
      },
    ],
    relationships: [
      {
        _type: 'aquasec_trivy_account_has_repository',
        sourceType: 'aquasec_trivy_account',
        _class: RelationshipClass.HAS,
        targetType: 'aquasec_trivy_repository',
      },
    ],
    dependsOn: ['fetch-account'],
    implemented: true,
  },
  {
    /**
     * ENDPOINT: n/a
     * PATTERN: Build child relationship
     */
    id: 'build-user-repository-relationships',
    name: 'Build Repository -> User Relationships',
    entities: [],
    relationships: [
      {
        _type: 'aquasec_trivy_user_created_repository',
        sourceType: 'aquasec_trivy_user',
        _class: RelationshipClass.CREATED,
        targetType: 'aquasec_trivy_repository',
      },
    ],
    dependsOn: ['fetch-repositories', 'fetch-users'],
    implemented: true,
  },
];
