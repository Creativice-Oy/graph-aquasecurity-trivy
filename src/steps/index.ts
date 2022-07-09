import { accountSteps } from './account';
import { actionSteps } from './action';
import { groupSteps } from './groups';
import { permissionSteps } from './permission';
import { registrySteps } from './registry';
import { roleSteps } from './role';
import { userSteps } from './users';

const integrationSteps = [
  ...accountSteps,
  ...userSteps,
  ...groupSteps,
  ...roleSteps,
  ...permissionSteps,
  ...actionSteps,
  ...registrySteps,
];

export { integrationSteps };
