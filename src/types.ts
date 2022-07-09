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
