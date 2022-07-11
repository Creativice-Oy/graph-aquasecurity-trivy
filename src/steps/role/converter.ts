import {
  createIntegrationEntity,
  Entity,
  parseTimePropertyValue,
} from '@jupiterone/integration-sdk-core';
import { AquasecTrivyRole } from '../../types';

import { Entities } from '../constants';

export function createRoleEntity(role: AquasecTrivyRole): Entity {
  return createIntegrationEntity({
    entityData: {
      source: role,
      assign: {
        _key: `aquasec_trivy_role:${role.name}`,
        _type: Entities.ROLE._type,
        _class: Entities.ROLE._class,
        name: role.name,
        description: role.description,
        author: role.author,
        updatedAt: parseTimePropertyValue(role.updated_at),
        permission: role.permission,
        scopes: role.scopes,
      },
    },
  });
}
