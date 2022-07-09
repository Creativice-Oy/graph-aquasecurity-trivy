import {
  createIntegrationEntity,
  Entity,
  parseTimePropertyValue,
} from '@jupiterone/integration-sdk-core';
import { AquasecTrivyPermission } from '../../types';

import { Entities } from '../constants';

export function createPermissionEntity(
  permission: AquasecTrivyPermission,
): Entity {
  return createIntegrationEntity({
    entityData: {
      source: permission,
      assign: {
        _key: `aquasec_trivy_permission:${permission.name}`,
        _type: Entities.PERMISSION._type,
        _class: Entities.PERMISSION._class,
        name: permission.name,
        description: permission.description,
        author: permission.author,
        updatedAt: parseTimePropertyValue(permission.updated_at),
        uiAccess: permission.ui_access,
        isSuper: permission.is_super,
        actions: permission.actions,
      },
    },
  });
}
