import { IntegrationSpecConfig } from '@jupiterone/integration-sdk-core';

import { IntegrationConfig } from '../../../src/config';
import { accountSpec } from './account';
import { actionSpec } from './action';
import { groupSpec } from './group';
import { permissionSpec } from './permission';
import { registrySpec } from './registry';
import { repositorySpec } from './repository';
import { roleSpec } from './role';
import { userSpec } from './user';

export const invocationConfig: IntegrationSpecConfig<IntegrationConfig> = {
  integrationSteps: [
    ...accountSpec,
    ...groupSpec,
    ...permissionSpec,
    ...roleSpec,
    ...userSpec,
    ...repositorySpec,
    ...registrySpec,
    ...actionSpec,
  ],
};
