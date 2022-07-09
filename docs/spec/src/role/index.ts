import { RelationshipClass, StepSpec } from '@jupiterone/integration-sdk-core';
import { IntegrationConfig } from '../../../../src/config';

export const roleSpec: StepSpec<IntegrationConfig>[] = [
  {
    /**
     * ENDPOINT: n/a
     * PATTERN: Iterate entities
     */
    id: 'fetch-roles',
    name: 'Fetch Roles',
    entities: [
      {
        resourceName: 'Role',
        _type: 'aquasec_trivy_role',
        _class: ['AccessRole'],
      },
    ],
    relationships: [
      {
        _type: 'aquasec_trivy_account_has_role',
        sourceType: 'aquasec_trivy_account',
        _class: RelationshipClass.HAS,
        targetType: 'aquasec_trivy_role',
      },
    ],
    dependsOn: ['fetch-account'],
    implemented: true,
  },
];
