import { RelationshipClass, StepSpec } from '@jupiterone/integration-sdk-core';
import { IntegrationConfig } from '../../../../src/config';

export const permissionSpec: StepSpec<IntegrationConfig>[] = [
  {
    /**
     * ENDPOINT: n/a
     * PATTERN: Iterate entities
     */
    id: 'fetch-permissions',
    name: 'Fetch Permissions',
    entities: [
      {
        resourceName: 'Permission',
        _type: 'aquasec_trivy_permission',
        _class: ['Entity'],
      },
    ],
    relationships: [
      {
        _type: 'aquasec_trivy_account_has_permission',
        sourceType: 'aquasec_trivy_account',
        _class: RelationshipClass.HAS,
        targetType: 'aquasec_trivy_permission',
      },
      {
        _type: 'aquasec_trivy_user_created_permission',
        sourceType: 'aquasec_trivy_user',
        _class: RelationshipClass.CREATED,
        targetType: 'aquasec_trivy_permission',
      },
    ],
    dependsOn: ['fetch-account', 'fetch-users'],
    implemented: true,
  },
  {
    /**
     * ENDPOINT: n/a
     * PATTERN: Build child relationship
     */
    id: 'build-permission-action-relationships',
    name: 'Build Permission -> Action Relationship',
    entities: [],
    relationships: [
      {
        _type: 'aquasec_trivy_permission_has_action',
        sourceType: 'aquasec_trivy_permission',
        _class: RelationshipClass.HAS,
        targetType: 'aquasec_trivy_action',
      },
    ],
    dependsOn: ['fetch-permissions', 'fetch-actions'],
    implemented: true,
  },
];
