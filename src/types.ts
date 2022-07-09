export type AquasecTrivyMeta = {
  status: number;
  code: number;
};

export type AquasecTrivyAccount = {
  data: {
    env_id: string;
    env_type: string;
    plan: string;
    region: string;
    creation_date: string;
    end_date: string;
    account_id: string;
    status: string;
    aqua_csp_version: string;
    ese_url: string;
  };
};

export type AquasecTrivyUser = {
  id: number;
  email: string;
  confirmed: boolean;
  password_reset: boolean;
  send_announcements: boolean;
  send_scan_results: boolean;
  send_new_plugins: boolean;
  send_new_risks: boolean;
  account_admin: boolean;
  created: string;
  multiaccount: boolean;
};

export type AquasecTrivyUserResponse = AquasecTrivyMeta & {
  data: AquasecTrivyUser[];
};

export type AquasecTrivyGroup = {
  id: number;
  name: string;
  created: string;
};

export type AquasecTrivyGroupResponse = AquasecTrivyMeta & {
  data: AquasecTrivyGroup[];
};

export type AquasecTrivyGroupDetails = AquasecTrivyMeta & {
  data: {
    id: number;
    name: string;
    created: string;
    users: AquasecTrivyUser[];
  };
};

export type AquasecTrivyRole = {
  name: string;
  description: string;
  author: string;
  updated_at: string;
  permission: string;
  scopes: string[];
  groups: AquasecTrivyUser[];
  users: AquasecTrivyGroup[];
};

export type AquasecTrivyRoleResponse = {
  count: number;
  page: number;
  pagesize: number;
  result: AquasecTrivyRole[];
  more_data_all_pages: number;
  is_estimated_count: boolean;
  feature_toggle: boolean;
};

export type AquasecTrivyPermission = {
  name: string;
  description: string;
  author: string;
  updated_at: string;
  ui_access: boolean;
  is_super: boolean;
  actions: string[];
};

export type AquasecTrivyPermissionResponse = {
  count: number;
  page: number;
  pagesize: number;
  result: AquasecTrivyPermission[];
  more_data_all_pages: number;
  is_estimated_count: boolean;
  feature_toggle: boolean;
};

export type AquasecTrivyAction = {
  action: string;
  name: string;
  description: string;
  has_write_access: boolean;
  has_scope: boolean;
};

export type AquasecTrivyActionResponse = {
  [key: string]: {
    name: string;
    actions: AquasecTrivyAction[];
  }[];
};

export type AquasecTrivyRegistry = {
  name: string;
  type: string;
  detected_type: number;
  description: string;
  author: string;
  lastupdate: number;
  url: string;
  username: string;
  auto_pull: boolean;
  registries_type: string;
  auto_pull_time: string;
  auto_pull_interval: number;
  auto_pull_max: number;
  pull_max_tags: number;
  auto_pull_rescan: boolean;
  webhook: {
    enabled: boolean;
    url: string;
    auth_token: string;
    un_quarantine: boolean;
  };
  registry_scan_timeout: number;
  pull_image_age: string;
  pull_image_count: number;
  permission: string;
  scanner_type: string;
  cloud_resource: string;
  image_creation_date_condition: string;
  auto_pull_latest_xff_enabled: boolean;
};
