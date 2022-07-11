import {
  createIntegrationEntity,
  Entity,
} from '@jupiterone/integration-sdk-core';
import { AquasecTrivyAccount } from '../../types';

import { Entities } from '../constants';

export function createAccountEntity(account: AquasecTrivyAccount): Entity {
  return createIntegrationEntity({
    entityData: {
      source: account,
      assign: {
        _key: 'aquasec_trivy:account',
        _type: Entities.ACCOUNT._type,
        _class: Entities.ACCOUNT._class,
        name: account.data.ese_url,
        envId: account.data.env_id,
        envType: account.data.env_type,
        plane: account.data.plan,
        region: account.data.region,
        creationDate: account.data.creation_date,
        endDate: account.data.end_date,
        accountId: account.data.account_id,
        status: account.data.status,
        aquaCsvVersion: account.data.aqua_csp_version,
        eseUrl: account.data.ese_url,
        webLink: `https://${account.data.ese_url}/`,
      },
    },
  });
}
