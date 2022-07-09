import { RelationshipClass, StepSpec } from '@jupiterone/integration-sdk-core';
import { IntegrationConfig } from '../../../../src/config';

export const accountSpec: StepSpec<IntegrationConfig>[] = [
  {
    /**
     * ENDPOINT: n/a
     * PATTERN: Iterate entities
     */
    id: 'fetch-users',
    name: 'Fetch Users',
    entities: [
      {
        resourceName: 'User',
        _type: 'aquasec_trivy_user',
        _class: ['User'],
      },
    ],
    relationships: [
      {
        _type: 'aquasec_trivy_account_has_user',
        sourceType: 'aquasec_trivy_account',
        _class: RelationshipClass.HAS,
        targetType: 'aquasec_trivy_user',
      },
    ],
    dependsOn: ['fetch-account'],
    implemented: true,
  },
];
