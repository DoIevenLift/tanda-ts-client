
// params
export interface GetUsersParams {
  show_wages?: boolean;
  show_qualifications?: boolean;
  show_regular_hours?: boolean;
  show_inactive?: boolean;
  updated_after?: number; //timestamp filter.
  location_id?: number;
  report_location_id?: number;
  role_types?: string;
  platform_role_ids?: string;
  employee_id?: string;
  platform?: boolean;
  page?: number;
  page_size?: number;
};

export interface GetUserParams {
  show_wages: boolean;
  show_regular_hours: boolean;
  platform: boolean;
};

//body
export interface CreateUserBody {
  name: string;
  date_of_birth: string;
  employment_start_date: string;
  employee_id: string;
  passcode: string;
  department_ids: number[];
  preferred_hours: number;
  part_time_fixed_hours: number;
  award_template_id: number;
  award_template_organisation_id: number;
  award_tag_ids: number[];
  report_department_id: number;
  managed_department_ids: number[];
  email: string;
  phone: string;
  days_overtime_averaged_over: number;
  overtime_calculated_over_period_start: string;
  can_see_costs: string;
  user_levels: string[];
  hourly_rate: number;
  yearly_salary: number;
  next_pay_group_id: number;
  address: Address;
  tax_declaration: TaxDeclaration;
  bank_details: BankDetails;
  super_fund_membership: SuperFund;
  regular_hours: RegularHours;
  temporary_employee_type: string;
};

export interface CreateUserWithMinimumFields {
  name: string;
};

export interface CreateUserWithRegularHours {
  name: string;
  regular_hours: RegularHours;
};

export interface UpdateUserBody {
  name: string;
  employee_id: string;
  passcode: string;
  phone: string;
  date_of_birth: string;
  employment_start_date: string;
  email: string;
  hourly_rate: number;
  enable_login: boolean;
  qualifications: Qualifactions[];
};

export interface UpdateUserBodyDeactivateUser {
  active: boolean;
};

export interface UpdateUserBodyRemoveDepartments {
  department_ids: number[]; //! tanda docs just say null.
};

export interface UpdateUserBodyUpdateRegularHours {
  regular_hours: RegularHours;
};

export interface InviteAUserForOnboardingBody {
  name: string;
  email: string;
  phone?: string;
  custom_message?: string;
};

export interface UpdateAlternateRatesByUserId {
  alternate_rates: {
    department_id: number;
    hourly_rate: number;
  }[];
};

//respones
export interface GetUsersListResponse {
  id: number;
  name: string;
  date_of_birth: string;
  employment_start_date: string;
  employee_id: string;
  passcode: string;
  platform_role_ids?: number[];
  department_ids?: number[];
  preferred_hours: number;
  award: {
    name: string;
    identifier: string;
  };
  award_template_id: number;
  award_template_organisation_id: number;
  award_tag_ids: number[];
  report_department_ids: number[];
  active: boolean;
  email: string;
  photo?: string | null;
  phone: string;
  normalised_phone: string;
  salary?: number;
  hourly_rate?: number;
  time_zone: string;
  utc_offset: number;
  part_time_fixed_hours: number;
  expected_hours_in_pay_period: number;
  days_overtime_averaged_over: number;
  overtime_calculated_over_period_start: string;
  super_fund?: {
    id: number;
    fund_name: string;
    product_name: string;
    smsf: boolean;
    abn: number;
  },
  super_fund_membership?: {
    super_contribution_type: string;
    trustee_director: boolean;
    member_number: string;
    employer_action_date: string;
    occupational_rating: string;
    super_fund_id: number;
    employer_default: number;
    employer_generic: number;
  },
  bank_details?: {
    bsb: number;
    account_number: number;
    account_name: string | number; // need to test this further.
  },
  address?: {
    street_line_one: string;
    street_line_two: string;
    city: string;
    state: string;
    country: string;
    postcode: string;
  },
  tax_declaration?: {
    previous_family_name: string;
    australian_tax_resident: boolean;
    australian_tax_residency_status: string;
    tax_free_threshold: boolean;
    senior_tax_offset: boolean;
    zone_overseas_carer: boolean;
    student_loan: boolean;
    financial_supplement_debt: boolean;
    tax_code: boolean;
    employment_basis: string;
    tax_file_number: number;
    student_loan_plans: string[];
    uk_tax_year_status: string;
    tax_scale_type: string;
    income_type: string;
    home_country: string;
    employment_type: string;
    senior_marital_status: string;
  },
  onboarding_status?: "not_applicable" | "pending" | "invited" | "in_progress" | "completed";
  qualifications?: {
    id: number;
    qualification_id: number;
    enabled: boolean;
    license_number: string;
    expires: string;
    in_training: boolean;
    platform_records: {
      "Proficiency Level": string;
    }
  }[];
  regular_hours?: {
    start_date: string;
    schedules: {
      week: number;
      day: string;
      start: string;
      end: string;
      breaks: string;
      department_id: number;
    }
  };
  minimum_base_hours: number;
  created_at: number; //timestamp. 
  record_id: number;
  next_pay_group_id: number;
  last_synced_mobile_app: number; //timestamp.
  automatic_break_rule_id: number;
  temporary_employee_type: string;
  position_title: string;
  position_template: string;
};

export interface CreateUserResponse {
  id: number;
  name: string;
  date_of_birth: string;
  employment_start_date: string;
  employment_end_date: string;
  employee_id: string;
  passcode: string;
  user_levels: string[];
  platform_role_ids: number[];
  department_ids: number[];
  preferred_hours: number;
  award_template_id: number;
  award_template_organisation_id: number;
  award_tag_ids: number[];
  report_department_id: number;
  managed_department_ids: number[];
  active: boolean;
  enable_login: boolean;
  can_see_costs: boolean;
  email: string;
  photo: string | null;
  phone: string;
  normalised_phone: string;
  time_zone: string;
  utc_offset: number;
  created_at: number; //timestamp.
  part_time_fixed_hours: number;
  next_pay_group_id: number;
  last_synced_mobile_app: number; //timestamp.
  automatic_break_rule_id: number;
};

export interface CreateUserResponseWithRegularHours {
  id: string;
  name: string;
  date_of_birth: string | null;
  employment_start_date: string | null;
  employement_end_date: string | null;
  employee_id: string | null;
  passcode: string | null;
  platform_role_ids: number[];
  department_ids: number[] | [];
  preferred_hours: number;
  award_template_id: number | null;
  managed_department_ids: number[] | [];
  active: boolean;
  enable_login: boolean;
  can_see_costs: boolean;
  email: string | null;
  photo: string | null;
  phone: string | null;
  normalised_phone: string | null;
  time_zone: string;
  utc_offset: number;
  created_at: number; //timestamp.
  part_time_fixed_hours: number;
  expected_hours_in_pay_period: number;
  days_overtime_averaged_over: number;
  overtime_calculated_over_period_start: string;
  super_fund_membership: string | SuperFund | null; //! not sure about this one.
  super_fund: string | SuperFund | null; //! not sure about this one.
  bank_details: string | BankDetails | null; //! not sure about this one.
  temporary_employee_type: string;
  tax_declaration: string | TaxDeclaration | null; //! not sure about this one.
  onboarding_status: string;
  qualifications: []; //! need to check what this is populated.
  regular_hours: RegularHours;
  updated_at: number; //timestamp.
};

export interface GetInactiveUsersResponse {
  id: number;
  name: string;
  date_of_birth: string | null;
  employment_start_date: string | null;
  employement_end_date: string | null;
  employee_id: string;
  passcode: string;
  department_ids: number[];
  preferred_hours: number;
  award_template_id: number;
  award_tag_ids: number[] | [];
  report_department_id: number;
  managed_department_ids: number[] | [];
  active: boolean;
  enable_login: boolean;
  can_see_costs: boolean;
  email: string;
  photo: string | null;
  phone: string;
  normalised_phone: string;
  time_zone: string;
  utc_offset: number;
  created_at: number; //timestamp.
  part_time_fixed_hours: number;
  expected_hours_in_pay_period: number | null;
  days_overtime_averaged_over: number | null;
  overtime_calculated_over_period_start: string | null;
  super_fund_membership: string | SuperFund | null; //! not sure about this one.
  super_fund: string | SuperFund | null; //! not sure about this one.
  bank_details: string | BankDetails | null; //! not sure about this one.
  temporary_employee_type: string | null;
  tax_declaration: string | TaxDeclaration | null; //! not sure about this one.
  onboarding_status: string;
  qualifications: []; //! need to check what this is populated.
  update_at: number; //timestamp.
};

export interface UpdateUserRemoveDepartmentsResponse {
  id: number;
  name: string;
  date_of_birth: string | null;
  employment_start_date: string | null;
  employement_end_date: string | null;
  employee_id: string;
  passcode: string;
  department_ids: [];
  preferred_hours: number;
  award_template_id: number;
  award_tag_ids: number[] | [];
  report_department_id: number;
  managed_department_ids: number[] | [];
  active: boolean;
  enable_login: boolean;
  can_see_costs: boolean;
  email: string;
  photo: string | null;
  phone: string;
  normalised_phone: string;
  salary: number | null;
  hourly_rate: number | null;
  time_zone: string;
  utc_offset: number;
  created_at: number; //timestamp.
  part_time_fixed_hours: number;
  expected_hours_in_pay_period: number | null;
  days_overtime_averaged_over: number | null;
  overtime_calculated_over_period_start: string | null;
  super_fund_membership: string | SuperFund | null; //! not sure about this one.
  super_fund: string | SuperFund | null; //! not sure about this one.
  bank_details: string | BankDetails | null; //! not sure about this one.
  tax_declaration: string | TaxDeclaration | null; //! not sure about this one.
  qualifications: Qualifactions | []; //! not sure about this one.
  updated_at: number; //timestamp.
};

export interface UpdateUserRegularHoursResponse extends UpdateUserRemoveDepartmentsResponse {
  regular_hours: RegularHours;
};

export interface GetUserVersionsResponse {
  version_id: number;
  time: number;
  event: string;
  author: {
    id: number;
    name: string;
  };
  item_id: number;
  item_type: string;
  changes: Changes[];
};

export interface GetAlternateRatesByUserIdResponse {
  alternate_rates: {
    department_id: number;
    hourly_rate: string | number;
  }[];
};

//ad hoc
interface Changes {
  field: string;
  previous: string | number;
  updated: string | number;
};

interface Qualifactions {
  qualification_id: number;
  enabled: boolean;
  license_number: string; //! this may be generic.
  expires: string;
  in_training: boolean; //! this maybe generic as well.
  file_id: string; //! uuid.
};

interface RegularHours {
  start_date: string;
  schedules: {
    week: number;
    day: string;
    start: string;
    end: string;
    breaks: string;
    department_id: number;
  }
};

interface SuperFund {
  request: {
    employer_default: boolean;
    ioof: boolean;
    own_choice: boolean;
    elevate: boolean;
  },
  config: {
    super_contribution_type: string;
    trustee_director: boolean;
    member_number: string;
    occupational_rating: string;
    super_fund_id: number;
  }
};

interface BankDetails {
  bsb: number;
  account_number: number;
  account_name: string | number;
}

interface TaxDeclaration {
  previous_family_name: string;
  australian_tax_resident: boolean;
  australian_tax_residenccy_status: string;
  tax_free_threshold: boolean;
  senior_tax_offset: boolean;
  zone_overseas_carer: boolean;
  student_loan: boolean;
  financial_supplement_debt: boolean;
  tax_code: boolean;
  employment_basis: string;
  tax_file_number: number;
  student_loan_plans: string[];
  uk_tax_year_status: string;
  tax_scale_type: string;
  income_type: string;
  home_country: string;
  employment_type: string;
  senior_marital_status: string;
};

interface Address {
  street_line_one: string;
  street_line_two: string;
  city: string;
  state: string;
  country: string;
  postcode: string;
};