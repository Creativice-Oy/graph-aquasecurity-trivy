import {
  RelationshipClass,
  StepEntityMetadata,
  StepRelationshipMetadata,
} from '@jupiterone/integration-sdk-core';

export const Steps = {
  ACCOUNT: 'fetch-account',
  USERS: 'fetch-users',
  ROLES: 'fetch-roles',
  GROUPS: 'fetch-groups',
  GROUP_USER_RELATIONSHIPS: 'build-user-group-relationships',
};

export const Entities: Record<
  'ACCOUNT' | 'GROUP' | 'USER' | 'ROLE',
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
};

export const Relationships: Record<
  | 'ACCOUNT_HAS_USER'
  | 'ACCOUNT_HAS_GROUP'
  | 'ACCOUNT_HAS_ROLE'
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
  GROUP_HAS_USER: {
    _type: 'aquasec_trivy_group_has_user',
    sourceType: Entities.GROUP._type,
    _class: RelationshipClass.HAS,
    targetType: Entities.USER._type,
  },
};
