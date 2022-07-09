import { RelationshipClass, StepSpec } from '@jupiterone/integration-sdk-core';
import { IntegrationConfig } from '../../../../src/config';

export const registrySpec: StepSpec<IntegrationConfig>[] = [
  {
    /**
     * ENDPOINT: n/a
     * PATTERN: Iterate entities
     */
    id: 'fetch-registries',
    name: 'Fetch Registries',
    entities: [
      {
        resourceName: 'Registry',
        _type: 'aquasec_trivy_registry',
        _class: ['Entity'],
      },
    ],
    relationships: [
      {
        _type: 'aquasec_trivy_account_has_registry',
        sourceType: 'aquasec_trivy_account',
        _class: RelationshipClass.HAS,
        targetType: 'aquasec_trivy_registry',
      },
    ],
    dependsOn: ['fetch-account'],
    implemented: true,
  },
];
