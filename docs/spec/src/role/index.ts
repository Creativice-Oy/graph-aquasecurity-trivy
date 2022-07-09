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
      {
        _type: 'aquasec_trivy_user_created_role',
        sourceType: 'aquasec_trivy_user',
        _class: RelationshipClass.CREATED,
        targetType: 'aquasec_trivy_role',
      },
    ],
    dependsOn: ['fetch-account', 'fetch-users'],
    implemented: true,
  },
];
