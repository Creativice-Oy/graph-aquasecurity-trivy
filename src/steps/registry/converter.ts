import {
  createIntegrationEntity,
  Entity,
} from '@jupiterone/integration-sdk-core';
import { AquasecTrivyRegistry } from '../../types';

import { Entities } from '../constants';

export function createRegistryKey(name: string): string {
  return `aquasec_trivy_registry:${name}`;
}

export function createRegistryEntity(registry: AquasecTrivyRegistry): Entity {
  return createIntegrationEntity({
    entityData: {
      source: registry,
      assign: {
        _key: createRegistryKey(registry.name),
        _type: Entities.REGISTRY._type,
        _class: Entities.REGISTRY._class,
        name: registry.name,
        type: registry.type,
        detectedType: registry.detected_type,
        description: registry.description,
        author: registry.author,
        lastUpdate: registry.lastupdate,
        ...(registry.url && { webLink: registry.url }),
        username: registry.username,
        autoPull: registry.auto_pull,
        registriesType: registry.registries_type,
        autoPullTime: registry.auto_pull_time,
        autoPullInterval: registry.auto_pull_interval,
        autoPullMax: registry.auto_pull_max,
        pullMaxTags: registry.pull_max_tags,
        autoPullRescan: registry.auto_pull_rescan,
        webhookEnabled: registry.webhook.enabled,
        webhookUrl: registry.webhook.url,
        webhookAuthToken: registry.webhook.auth_token,
        webhookUnQuarantine: registry.webhook.un_quarantine,
        registryScanTimeout: registry.registry_scan_timeout,
        pullImageAge: registry.pull_image_age,
        pullImageCount: registry.pull_image_count,
        permission: registry.permission,
        scannerType: registry.scanner_type,
        cloudResource: registry.cloud_resource,
        imageCreationDateCondition: registry.image_creation_date_condition,
        autoPullLatestXffEnabled: registry.auto_pull_latest_xff_enabled,
      },
    },
  });
}
