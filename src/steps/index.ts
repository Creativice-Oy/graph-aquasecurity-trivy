import { accountSteps } from './account';
import { groupSteps } from './groups';
import { roleSteps } from './role';
import { userSteps } from './users';

const integrationSteps = [
  ...accountSteps,
  ...userSteps,
  ...groupSteps,
  ...roleSteps,
];

export { integrationSteps };
