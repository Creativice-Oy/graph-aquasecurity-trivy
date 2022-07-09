import { RelationshipClass, StepSpec } from '@jupiterone/integration-sdk-core';
import { IntegrationConfig } from '../../../../src/config';

export const groupSpec: StepSpec<IntegrationConfig>[] = [
  {
    /**
     * ENDPOINT: n/a
     * PATTERN: Iterate entities
     */
    id: 'fetch-groups',
    name: 'Fetch Groups',
    entities: [
      {
        resourceName: 'Group',
        _type: 'aquasec_trivy_group',
        _class: ['Group'],
      },
    ],
    relationships: [
      {
        _type: 'aquasec_trivy_account_has_group',
        sourceType: 'aquasec_trivy_account',
        _class: RelationshipClass.HAS,
        targetType: 'aquasec_trivy_group',
      },
    ],
    dependsOn: ['fetch-account'],
    implemented: true,
  },
];
