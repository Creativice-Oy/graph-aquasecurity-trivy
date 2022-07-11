import {
  createIntegrationEntity,
  Entity,
} from '@jupiterone/integration-sdk-core';
import { AquasecTrivyAction } from '../../types';

import { Entities } from '../constants';

export function createActionKey(action: string): string {
  return `aquasec_trivy_action:${action}`;
}

export function createActionEntity(
  method: string,
  action: AquasecTrivyAction,
): Entity {
  return createIntegrationEntity({
    entityData: {
      source: action,
      assign: {
        _key: createActionKey(`${action.action}.${method}`),
        _type: Entities.ACTION._type,
        _class: Entities.ACTION._class,
        action: action.action,
        name: `${action.action}.${method}`,
        description: action.description,
        hasWriteAccess: action.has_write_access,
        hasScope: action.has_scope,
        method,
      },
    },
  });
}
