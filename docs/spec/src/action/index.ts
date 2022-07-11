import { RelationshipClass, StepSpec } from '@jupiterone/integration-sdk-core';
import { IntegrationConfig } from '../../../../src/config';

export const actionSpec: StepSpec<IntegrationConfig>[] = [
  {
    /**
     * ENDPOINT: n/a
     * PATTERN: Iterate entities
     */
    id: 'fetch-actions',
    name: 'Fetch Actions',
    entities: [
      {
        resourceName: 'Action',
        _type: 'aquasec_trivy_action',
        _class: ['Entity'],
      },
    ],
    relationships: [
      {
        _type: 'aquasec_trivy_account_has_action',
        sourceType: 'aquasec_trivy_account',
        _class: RelationshipClass.HAS,
        targetType: 'aquasec_trivy_action',
      },
    ],
    dependsOn: ['fetch-account'],
    implemented: true,
  },
];
