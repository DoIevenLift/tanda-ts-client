
export interface GetCurrentTimesheetsParams {
  show_costs?: boolean;
  show_award_interpretation?: boolean;
  show_notes: boolean;
  updated_after?: number; //timestamp
  report_location_id?: number;
  export_format?: string;
  skip_status_update?: boolean;
  approved_only?: boolean;
};

export interface GetCurrentTimesheetsOnDateParams {
  show_costs?: boolean;
  show_award_interpretation?: boolean;
  updated_after?: number; //timestamp
  report_location_id?: number;
  export_format?: string;
  skip_status_update?: boolean;
  approved_only?: boolean;
  page?: number;
  page_size?: number;
};

export interface GetCurrentTimesheetForUserParams {
  show_costs?: boolean;
  show_award_interpretation?: boolean;
  approved_only?: boolean;
};

export interface GetTimesheetParams {
  show_costs?: boolean;
  show_award_interpretation?: boolean;
  show_notes?: boolean;
  approved_only?: boolean;
};

export interface UpdateTimesheetStatusBody {
  status: "pending" | "approved" | "exported"
};

export interface GetCurrentTimesheetsResponse {
  id: number;
  user_id: number;
  start: string; //timestamp
  finish: string; //timestamp
  status: string;
  shifts: {
    id: number;
    timesheet_id: number;
    user_id: number;
    date: string;
    start: string; //timestamp
    break_start: string; //timestamp
    break_finish: string; //timestamp
    break_length: number;
    breaks: {
      id: number;
      shift_id: number;
      start: string; //timestamp
      finish: string; //timestamp
      length: number;
      paid: boolean;
      selected_automatic_break_id: number;
    }[];
    finish: string; //timestamp
    status: string;
    allowances: {
      id: number;
      name: string;
      value: number;
      cost: number;
    }[];
    tag: string;
    tag_id: number;
    cost: number;
    award_interpretation: {
      units: number;
      date: string;
      export_name: string;
      secondary_export_name: string;
      pay_class: string;
      ordinary_hours: boolean;
      cost: number;
      from: string; //timestamp
      to: string; //timestamp
    }[];
    department_id: number;
    metadata: string;
    leave_request_id: number;
    record_id: number;
    approved_by: number;
    approved_at: string; //timestamp
    notes: {
      body: string;
      author: string;
    }[];
  }[];
  cost: number;
  award_interpretation: {
    units: number;
    date: string;
    export_name: string;
    secondary_export_name: string;
    pay_class: string;
    ordinary_hours: boolean;
    cost: number;
    from: string; //timestamp
    to: string; //timestamp
  }[];
  notes: {
    body: string;
    author: string;
  }[];
};