//param

//body

export interface CreateOrganisation {
  name: string;
  country: string;
  timesheet_interval: 1 | 2;
  week_start_day: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  locale?: string;
  time_zone?: string;
  award_template_ids?: number[];
  industry?: string;
  customer_ids?: string[];
};

export interface UpdateOrganisation {
  name?: string;
  country?: string;
  timesheet_interval?: 1 | 2;
  week_start_day?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  locale?: string;
  time_zone?: string;
  award_template_ids?: number[];
  industry?: string;
  customer_ids?: string[];
};

export interface AccessToken {
  access_token: string;
  organisation_id: number;
  scope: string;
  grant_type: 'partner_token'
};

//response

export interface OrganisationsResponse {
  id: number;
  name: string;
  payroll_system: string;
  country: string;
  local: string;
  time_zone: string;
  industry: string;
  customer_ids: string[];
};

export interface AccessTokenResponse {
  access_token: string;
  token_type: string;
  scope: string;
  created_at: number; //timestamp
};

//adhoc
