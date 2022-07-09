import { accountSteps } from './account';
import { groupSteps } from './groups';
import { permissionSteps } from './permission';
import { roleSteps } from './role';
import { userSteps } from './users';

const integrationSteps = [
  ...accountSteps,
  ...userSteps,
  ...groupSteps,
  ...roleSteps,
  ...permissionSteps,
];

export { integrationSteps };
