
export interface GetSchedulesParams {
  ids: string[];
  show_costs?: boolean;
  show_award_interpretation?: boolean;
  include_names?: boolean;
  include_colleagues?: boolean;
  platform?: boolean;
  updated_after?: number; //timestamp
  published_only?: boolean;
  show_vacant_only?: boolean;
};

export interface GetSchedulesByUserParams {
  user_ids: string[];
  show_costs?: boolean;
  show_award_interpretation?: boolean;
  include_names?: boolean;
  updated_after?: number; //timestamp
};

export interface CreateScheduleBody {
  user_id: number;
  start: number; //timestamp
  finish: number; //timestamp
  department_id: number;
  automatic_break_length: number;
};

export interface CreateVacantScheduleBody {
  start: number; //timestamp
}

export interface GetSchedulesResponse {
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
};

export interface CreateScheduleResponse {
  id: number;
  roster_id: number;
  user_id: number;
  start: number; //timestamp
  finish: number | null; //timestamp
  breaks: {
    start: number; //timestamp
    finish: number; //timestamp
  }[] | [] | null;
  automatic_break_length: number | null;
  department_id: number | null;
  shift_detail_id: number | null;
  last_published_at: number | null; //timestamp
  last_acknowledged_at: number | null; //timestamp
  acceptance_status: string; //! need to check on this one.
}