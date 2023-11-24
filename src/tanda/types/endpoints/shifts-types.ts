
//params

export interface GetShiftsParams {
  ids?: string[];
  user_ids?: string[];
  from?: string;
  to?: string;
  show_costs?: boolean;
  show_award_interpretation?: boolean;
  show_associated_tags?: boolean; //! this could be tag.
  show_notes?: boolean;
  report_location_id?: number;
  platform?: boolean;
  page?: number;
  page_size?: number;
  updated_after?: number;
}

export interface GetShiftParams {
  show_costs?: boolean;
  show_award_interpretation?: boolean;
  show_associated_tags?: boolean; //! this could be tag.
  show_notes?: boolean;
  show_export_name?: boolean;
  platform?: boolean;
};

// body
export interface CreateShiftBody {
  user_id: number;
  date: string;
  start: string; //timestamp
  finish: string; //timestamp
  department_id: number;
  metadata: string;
};

export interface CreateShiftWithBreaks extends CreateShiftBody {
  break_start: string; //timestamp
  break_finish: string; //timestamp
};

export interface CreateApprovedShift {
  user_id: number;
  date: string;
  start: string; //timestamp
  finish: string; //timestamp
  status: string;
  tag: string | null;
};

export interface CreateShiftWithAllowances {
  user_id: number;
  date: string;
  start: string; //timestamp
  finish: string; //timestamp
  allowances: {
    id: number;
    value: number; //! need to test this.
  }[];
};

export interface UpdateShiftApproveShiftBody {
  status: string;
};

export interface UpdateShiftTimesBody {
  start: number; //timestamp
  finish: number; //timestamp
};

export interface UpdateShiftTimesOnNewDateBody {
  date: string;
  start: number;
  finish: number;
  break_start: number;
  break_finish: number;
};

export interface UpdateShiftAllowancesBody {
  allowances: {
    id: number;
    value: number;
  }[];
};

export interface CreateShiftBreakWithTimes {
  start: number; //timestamp
  finish: number; //timestamp
};

export interface CreateShiftBreakWithLength {
  length: number;
};

export interface CreateShiftBreakWithPaid {
  paid: boolean;
};

//responses
export interface GetShiftsResponse {
  id: number;
  timesheet_id: number;
  user_id: number;
  date: string;
  start: number; //timestamp
  break_start: number; //timestamp
  break_finish: number; //timestamp
  break_length: number;
  breaks: Breaks[];
  finish: number; //timestamp
  status: string;
  allowances: Allowances[];
  tag: string;
  tag_id: number;
  cost: number;
  award_interpretation: AwardInterpretation[];
  department_id: number;
  metadata: string;
  leave_request_id: number;
  record_id: number;
  approved_by: number;
  approved_at: number;
  notes: Notes[];
};

export interface GetShiftLimitsResponse {
  id: number;
  timesheet_id: number;
  user_id: number;
  date: string;
  start: number; //timestamp
  break_start: number; //timestamp
  break_finish: number; //timestamp
  break_length: number;
  breaks: Breaks[];
  finish: number; //timestamp
  status: string;
  allowances: Allowances[];
  tag: string;
  tag_id: number;
  cost: number;
  award_interpretation: AwardInterpretation[];
  department_id: number;
  department_export_name: string;
  metadata: string;
  leave_request_id: number;
};

export interface CreateShiftResponse {
  id: number;
  timesheet_id: number;
  user_id: number;
  date: string;
  start: string; //timestamp
  break_start: number | null; //timestamp
  break_finish: number | null; //timestamp
  break_length: number | null;
  finish: string; //timestamp
  status: string;
  allowances: Allowances[] | [];
  tag: string | null;
  tag_id: number | null;
  department_id: number;
  department_export_name: string;
  metadata: string;
  leave_request_id: number | null;
};

export interface CreateShiftWithBreaksResponse {
  id: number;
  timesheet_id: number;
  user_id: number;
  date: string;
  start: string; //timestamp
  break_start: number | null; //timestamp
  break_finish: number | null; //timestamp
  break_length: number | null;
  finish: string; //timestamp
  status: string;
  allowances: Allowances[] | [];
  tag: string | null;
  tag_id: number | null;
  department_id: number;
  department_export_name: string;
  metadata: string;
};

export interface CreateApprovedShiftResponse {
  id: number;
  timesheet_id: number;
  user_id: number;
  start: string; //timestamp
  break_start: number | null; //timestamp
  break_finish: number | null; //timestamp
  break_length: number | null;
  finish: string; //timestamp
  status: string;
  allowances: Allowances[] | [];
  tag: string | null;
  tag_id: number | null;
  metadata: string;
  leave_request_id: number | null;
};

export interface CreateShiftWithAllowancesResponse {
  id: number;
  timesheet_id: number;
  user_id: number;
  date: string;
  start: string; //timestamp
  break_start: number | null; //timestamp
  break_finish: number | null; //timestamp
  break_length: number | null;
  finish: string; //timestamp
  status: string;
  allowances: {
    id: number;
    value: number; //! need to test this.
  }[];
  tag: string | null;
  tag_id: number | null;
  metadata: string;
  leave_request_id: number | null;
};

export interface GetActiveShifts {
  user_id: number;
  shift_id: number;
  status: string;
};

export interface GetShiftsApplicableAllowance { //! not necessarily correct - ref: https://my.tanda.co/api/v2/documentation#shifts-shift-s-applicable-allowances-get
  id: number;
  name: string;
  export_name: string;
  current_value: string;
};

export interface GetShiftVersions {
  version_id: number;
  time: number; //timestamp
  event: string;
  author: {
    id: number;
    name: string;
  };
  item_id: number;
  item_type: string;
  changes: Changes[];
};

export interface GetShiftBreaks {
  id: number;
  shift_id: number;
  start: number; //timestamp
  finish: number; //timestamp
  length: number;
  paid: boolean;
  selected_automatic_break_id: number;
};

export interface CreateShiftBreakResponse {
  id: number;
  shift_id: number;
  start: number | null; //timestamp
  finish: number | null; //timestamp
  length: number;
  paid: boolean;
};

export interface CreateShiftBreakWithTimesResponse extends CreateShiftBreakResponse {
  selected_automatic_break_id: number;
};

//ad hoc

interface Changes { //! unsure - ref: https://my.tanda.co/api/v2/documentation#shifts-shift-versions-get
  field: string;
  previous: number | string;
  updated: number | string;
}

interface Notes {
  body: string;
  author: string;
}

interface Breaks {
  id: number;
  shift_id: number;
  start: number; //timestamp
  finish: number; //timestamp
  length: number;
  paid: boolean;
  selected_automatic_break_id: number;
};

interface Allowances {
  id: number;
  name: string;
  value: number;
  cost: number;
};

interface AwardInterpretation {
  units: number;
  date: string;
  export_name: string;
  secondary_export_name: string;
  pay_class: string;
  ordinary_hours: boolean;
  cost: number;
  from: string; //timestamp
  to: string; //timestamp
}