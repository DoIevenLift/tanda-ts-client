//param

export interface GetUnavailabilityParams {
  ids?: string[];
  from?: string;
  to?: string;
  user_ids?: string[];
  updated_after?: number;
};



//body
export interface CreateUnavailability {
  user_id: number;
  title: string;
  start: number; //timestamp
  finish: number; //timestamp
  repeating: boolean;
};

export interface CreateUnavailabilityAllDay {
  user_id: number;
  title: string;
  date_from: string;
  date_to: string;
  repeating: boolean;
  all_day: boolean;
};

export interface CreateRepeatingUnavailability extends CreateUnavailability {
  repeating_info: {
    interval: string;
    occurrences: number;
  }
};

//response
export interface UnavailabilityResponse {
  id: number;
  user_id: number;
  title: string;
  start: number; //timestamp
  finish: number; //timestamp
  repeating: boolean;
  repeating_info: RepeatingInfo | null;
  all_day: boolean;
};

export interface RepeatingUnavailabilityResponse {
  id: number;
  user_id: number;
  title: string;
  start: number; //timestamp
  finish: number; //timestamp
  repeating: boolean;
  repeating_info: RepeatingInfo;
};

//ad hoc

interface RepeatingInfo {
  interval: string;
  occurrences: number;
  start: number; //timestamp
  ids: number[];
};