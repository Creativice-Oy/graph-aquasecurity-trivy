import {
  createIntegrationEntity,
  Entity,
  parseTimePropertyValue,
} from '@jupiterone/integration-sdk-core';
import { AquasecTrivyGroup } from '../../types';

import { Entities } from '../constants';

export function createGroupEntity(group: AquasecTrivyGroup): Entity {
  return createIntegrationEntity({
    entityData: {
      source: group,
      assign: {
        _key: `aquasec_trivy_group:${group.id}`,
        _type: Entities.GROUP._type,
        _class: Entities.GROUP._class,
        id: group.id.toString(),
        name: group.name,
        created: parseTimePropertyValue(group.created),
      },
    },
  });
}
