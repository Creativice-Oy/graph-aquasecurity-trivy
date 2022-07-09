import { accountSteps } from './account';
import { groupSteps } from './groups';
import { userSteps } from './users';

const integrationSteps = [...accountSteps, ...userSteps, ...groupSteps];

export { integrationSteps };
