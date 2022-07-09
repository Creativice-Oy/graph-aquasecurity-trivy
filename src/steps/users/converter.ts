import {
  createIntegrationEntity,
  Entity,
} from '@jupiterone/integration-sdk-core';
import { AquasecTrivyUser } from '../../types';

import { Entities } from '../constants';

export function createUserEntity(user: AquasecTrivyUser): Entity {
  return createIntegrationEntity({
    entityData: {
      source: user,
      assign: {
        _key: `aquasec_trivy_user:${user.id}`,
        _type: Entities.USER._type,
        _class: Entities.USER._class,
        id: user.id.toString(),
        name: user.email,
        username: user.email,
        active: true,
        email: user.email,
        confirmed: user.confirmed,
        passwordReset: user.password_reset,
        sendAnnouncements: user.send_announcements,
        sendScanResults: user.send_scan_results,
        sendNewPlugins: user.send_new_plugins,
        sendNewRisks: user.send_new_risks,
        accountAdmin: user.account_admin,
        created: user.created,
        multiAccount: user.multiaccount,
      },
    },
  });
}
