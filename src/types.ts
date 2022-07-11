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

export type AquasecTrivyRepository = {
  name: string;
  registry: string;
  author: string;
  policy: string;
  dynamic_profiling: boolean;
  num_images: number;
  num_disallowed: number;
  num_failed: number;
  first_scan_failed: boolean;
  crit_vulns: number;
  high_vulns: number;
  med_vulns: number;
  low_vulns: number;
  neg_vulns: number;
  sensitive_data: number;
  malware: number;
  dta: {
    Severity: string;
    Count: number;
  }[];
  trusted_base_count: number;
  whitelisted_images_count: number;
  is_default_policy: boolean;
  permission: string;
  created_images_count: number;
};

export type AquasecTrivyRepositoryResponse = {
  count: number;
  page: number;
  pagesize: number;
  result: AquasecTrivyRepository[];
  query: {
    time: string;
    scope: string;
    ImageID: string;
  };
  more_data: number;
  more_data_all_pages: number;
  is_estimated_count: false;
  feature_toggle: false;
};

export type AquasecVulnerability = {
  name: string;
  description: string;
  publish_date: string;
  modification_date: string;
  vendor_severity: string;
  vendor_cvss2_score: number;
  vendor_cvss2_vectors: string;
  vendor_statement: string;
  vendor_url: string;
  nvd_severity: string;
  nvd_cvss2_score: number;
  nvd_cvss2_vectors: string;
  nvd_cvss3_severity: string;
  nvd_cvss3_score: number;
  nvd_cvss3_vectors: string;
  nvd_url: string;
  fix_version: string;
  solution: string;
  classification: string;
  aqua_score: number;
  aqua_severity: string;
  aqua_vectors: string;
  aqua_scoring_system: string;
  first_found_date: string;
  last_found_date: string;
  ancestor_pkg: string;
  sibling_pkg: string;
  severity_classification: string;
  aqua_severity_classification: string;
  aqua_score_classification: string;
  temporal_vector: string;
  exploit_type: string;
  custom_severity: string;
  custom_notes: string;
  v_patch_applied_by: string;
  v_patch_applied_on: string;
  v_patch_reverted_by: string;
  v_patch_reverted_on: string;
  v_patch_enforced_by: string;
  v_patch_enforced_on: string;
  v_patch_status: string;
  acknowledged_date: string;
  ack_scope: string;
  ack_comment: string;
  ack_author: string;
  ack_expiration_days: number;
  ack_expiration_configured_at: string;
  ack_expiration_configured_by: string;
  v_patch_policy_name: string;
  v_patch_policy_enforce: boolean;
  audit_events_count: number;
  block_events_count: number;
  resource: {
    type: string;
    format: string;
    path: string;
    name: string;
    version: string;
    arch: string;
    cpe: string;
    hash: string;
  };
  registry: string;
  image_repository_name: string;
  image_name: string;
  image_digest: string;
  os: string;
  os_version: string;
  permission: string;
  has_running_workloads: boolean;
  name_space: string;
  architecture: string;
  app_scope: string;
  vm_type: string;
};

export type AquasecVulnerabilityResponse = {
  count: number;
  page: number;
  pagesize: number;
  result: AquasecVulnerability[];
  more_data_all_pages: number;
  is_estimated_count: boolean;
  feature_toggle: boolean;
};
