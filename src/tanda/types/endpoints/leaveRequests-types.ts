//param

export interface GetLeaveRequestsParams {
  ids?: string[],
  from?: string;
  to?: string;
  user_ids?: string[];
  page?: number;
  page_size?: number;
  updated_after?: number;
  include_interactive?: boolean;
};

export interface GetDefaultLeaveHoursParams {
  user_id: number;
  start: string;
  finish: string;
  leave_type?: string
}

//body

export interface CreateLeaveRequestBody {
  reason: string;
  department_id: number;
  user_id: number;
  hours: number;
  start: string;
  finish: string;
  start_time: string;
  finish_time: string;
  leave_type: string;
  fallback_leave_type: string;
  status: string;
  all_day: boolean;
  file_id: string | null;
  daily_breakdown: DailyBreakdown[]; //! potentially wrong.
};

export interface UpdateLeaveRequestBody {
  reason: string;
};

//response

export interface LeaveRequestsResponse {
  id: number;
  department_id: number;
  user_id: number;
  reason: string;
  leave_type: string;
  hours: number;
  start: string;
  finish: string;
  start_time: string;
  finish_time: string;
  status: string;
  multitagging: string;
  all_day: boolean;
  include_inactive: boolean;
  daily_breakdown: DailyBreakdown[];
};

export interface LeaveRequestsForUserResponse { //! need further clarity.
  [key: string] : string;
};

export interface DefaultLeaveHoursResponse {
  hours: string;
}
//ad hoc

interface DailyBreakdown {
  [key: string]: {}; // this is a field which is determined by the date of the leave.
  hours: number;
  all_day: boolean;
  start_time: string;
  finish_time: string;
};