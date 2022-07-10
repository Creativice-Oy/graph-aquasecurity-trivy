import {
  RelationshipClass,
  StepEntityMetadata,
  StepRelationshipMetadata,
} from '@jupiterone/integration-sdk-core';

export const Steps = {
  ACCOUNT: 'fetch-account',
  USERS: 'fetch-users',
  ROLES: 'fetch-roles',
  PERMISSION: 'fetch-permissions',
  ACTION: 'fetch-actions',
  GROUPS: 'fetch-groups',
  REGISTRIES: 'fetch-registries',
  REPOSITORIES: 'fetch-repositories',
  GROUP_USER_RELATIONSHIPS: 'build-user-group-relationships',
  ROLE_USER_RELATIONSHIPS: 'build-user-role-relationships',
  REPOSITORY_USER_RELATIONSHIPS: 'build-user-repository-relationships',
  REPOSITORY_REGISTRY_RELATIONSHIPS: 'build-registry-repository-relationships',
  PERMISSION_ACTION_RELATIONSHIPS: 'build-permission-action-relationships',
};

export const Entities: Record<
  | 'ACCOUNT'
  | 'GROUP'
  | 'USER'
  | 'ROLE'
  | 'PERMISSION'
  | 'ACTION'
  | 'REGISTRY'
  | 'REPOSITORY',
  StepEntityMetadata
> = {
  ACCOUNT: {
    resourceName: 'Account',
    _type: 'aquasec_trivy_account',
    _class: ['Account'],
  },
  GROUP: {
    resourceName: 'UserGroup',
    _type: 'aquasec_trivy_group',
    _class: ['UserGroup'],
  },
  USER: {
    resourceName: 'User',
    _type: 'aquasec_trivy_user',
    _class: ['User'],
  },
  ROLE: {
    resourceName: 'Role',
    _type: 'aquasec_trivy_role',
    _class: ['AccessRole'],
  },
  PERMISSION: {
    resourceName: 'Permission',
    _type: 'aquasec_trivy_permission',
    _class: ['Entity'],
  },
  ACTION: {
    resourceName: 'Action',
    _type: 'aquasec_trivy_action',
    _class: ['Entity'],
  },
  REGISTRY: {
    resourceName: 'Registry',
    _type: 'aquasec_trivy_registry',
    _class: ['Entity'],
  },
  REPOSITORY: {
    resourceName: 'Repository',
    _type: 'aquasec_trivy_repository',
    _class: ['Repository'],
  },
};

export const Relationships: Record<
  | 'ACCOUNT_HAS_USER'
  | 'ACCOUNT_HAS_GROUP'
  | 'ACCOUNT_HAS_ROLE'
  | 'USER_CREATED_ROLE'
  | 'ACCOUNT_HAS_PERMISSION'
  | 'ACCOUNT_HAS_ACTION'
  | 'ACCOUNT_HAS_REGISTRY'
  | 'ACCOUNT_HAS_REPOSITORY'
  | 'USER_CREATED_PERMISSION'
  | 'USER_CREATED_REPOSITORY'
  | 'REGISTRY_HAS_REPOSITORY'
  | 'PERMISSION_HAS_ACTION'
  | 'GROUP_HAS_USER',
  StepRelationshipMetadata
> = {
  ACCOUNT_HAS_USER: {
    _type: 'aquasec_trivy_account_has_user',
    sourceType: Entities.ACCOUNT._type,
    _class: RelationshipClass.HAS,
    targetType: Entities.USER._type,
  },
  ACCOUNT_HAS_GROUP: {
    _type: 'aquasec_trivy_account_has_group',
    sourceType: Entities.ACCOUNT._type,
    _class: RelationshipClass.HAS,
    targetType: Entities.GROUP._type,
  },
  ACCOUNT_HAS_ROLE: {
    _type: 'aquasec_trivy_account_has_role',
    sourceType: Entities.ACCOUNT._type,
    _class: RelationshipClass.HAS,
    targetType: Entities.ROLE._type,
  },
  USER_CREATED_ROLE: {
    _type: 'aquasec_trivy_user_created_role',
    sourceType: Entities.USER._type,
    _class: RelationshipClass.CREATED,
    targetType: Entities.ROLE._type,
  },
  USER_CREATED_REPOSITORY: {
    _type: 'aquasec_trivy_user_created_repository',
    sourceType: Entities.USER._type,
    _class: RelationshipClass.CREATED,
    targetType: Entities.REPOSITORY._type,
  },
  ACCOUNT_HAS_PERMISSION: {
    _type: 'aquasec_trivy_account_has_permission',
    sourceType: Entities.ACCOUNT._type,
    _class: RelationshipClass.HAS,
    targetType: Entities.PERMISSION._type,
  },
  ACCOUNT_HAS_ACTION: {
    _type: 'aquasec_trivy_account_has_action',
    sourceType: Entities.ACCOUNT._type,
    _class: RelationshipClass.HAS,
    targetType: Entities.ACTION._type,
  },
  USER_CREATED_PERMISSION: {
    _type: 'aquasec_trivy_user_created_permission',
    sourceType: Entities.USER._type,
    _class: RelationshipClass.CREATED,
    targetType: Entities.PERMISSION._type,
  },
  GROUP_HAS_USER: {
    _type: 'aquasec_trivy_group_has_user',
    sourceType: Entities.GROUP._type,
    _class: RelationshipClass.HAS,
    targetType: Entities.USER._type,
  },
  PERMISSION_HAS_ACTION: {
    _type: 'aquasec_trivy_permission_has_action',
    sourceType: Entities.PERMISSION._type,
    _class: RelationshipClass.HAS,
    targetType: Entities.ACTION._type,
  },
  ACCOUNT_HAS_REGISTRY: {
    _type: 'aquasec_trivy_account_has_registry',
    sourceType: Entities.ACCOUNT._type,
    _class: RelationshipClass.HAS,
    targetType: Entities.REGISTRY._type,
  },
  ACCOUNT_HAS_REPOSITORY: {
    _type: 'aquasec_trivy_account_has_repository',
    sourceType: Entities.ACCOUNT._type,
    _class: RelationshipClass.HAS,
    targetType: Entities.REPOSITORY._type,
  },
  REGISTRY_HAS_REPOSITORY: {
    _type: 'aquasec_trivy_registry_has_repository',
    sourceType: Entities.REGISTRY._type,
    _class: RelationshipClass.HAS,
    targetType: Entities.REPOSITORY._type,
  },
};
