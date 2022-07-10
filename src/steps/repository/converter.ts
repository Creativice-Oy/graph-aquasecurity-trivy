import {
  createIntegrationEntity,
  Entity,
} from '@jupiterone/integration-sdk-core';
import { AquasecTrivyRepository } from '../../types';

import { Entities } from '../constants';

export function createRepositoryKey(name: string): string {
  return `aquasec_trivy_repository:${name}`;
}

export function createRepositoryEntity(
  repository: AquasecTrivyRepository,
): Entity {
  return createIntegrationEntity({
    entityData: {
      source: repository,
      assign: {
        _key: createRepositoryKey(repository.name),
        _type: Entities.REPOSITORY._type,
        _class: Entities.REPOSITORY._class,
        name: repository.name,
        registry: repository.registry,
        author: repository.author,
        policy: repository.policy,
        dynamicProfiling: repository.dynamic_profiling,
        numImages: repository.num_images,
        numDisallowed: repository.num_disallowed,
        numFailed: repository.num_failed,
        firstScanFailed: repository.first_scan_failed,
        critVulns: repository.crit_vulns,
        highVulns: repository.high_vulns,
        medVulns: repository.med_vulns,
        lowVulns: repository.low_vulns,
        negVulns: repository.neg_vulns,
        sensitiveData: repository.sensitive_data,
        malware: repository.malware,
        trustedBaseCount: repository.trusted_base_count,
        whitelistedImagesCount: repository.whitelisted_images_count,
        isDefaultPolicy: repository.is_default_policy,
        permission: repository.permission,
        createdImagesCount: repository.created_images_count,
      },
    },
  });
}
