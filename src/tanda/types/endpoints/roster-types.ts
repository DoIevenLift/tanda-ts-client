
//params
export interface GetRosterThatContainsDateParams {
  show_costs?: boolean;
  page?: number;
  page_size?: number;
};

//responses
export interface GetRosterResponse {
  id: number;
  schedules: {
    date: string;
    schedules: {
      id: number;
      roster_id: number;
      user_id: number;
      start: number; //timestamp
      finish: number; //timestamp
      breaks: {
        start: number; //timestamp
        finish: number; //timestamp
      }[];
      automatic_break_length: number;
      department_id: number;
      shift_detail_id: number;
      cost: number;
      last_published_at: number; //timestamp
      acceptance_status: string; //! need to check on this one.
      record_id: number;
      needs_acceptance: boolean;
      creation_method: string;
      creation_platform: string;
    }[];
  }[];
  start: string; //date
  finish: string; //date
  cost: number;
  meta: {
    page: number;
    page_size: number;
    total: number;
    total_pages: number;
  }
};

export interface GetSalesTargetResponse {
  target: string;
  created_at: string | null;
  updated_at: string | null;
  user_entered: boolean;
};