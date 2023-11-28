//param
//! not necessarily correct. Should be Type and then Device_id -> blah && user_id -> blah
export interface ClockIn {
  user_id: number;
  device_id: number;
  from: string;
  to: string;
  updated_after?: number;
}
//body

export interface PerformClockInForUser {
  user_id: number;
  type: 'start' | 'finish';
  time: number; //timestamp
  device_id: number;
  photo?: string;
  department_id?: number;
  answers?: Answers[];
};

// export interface PerformClockInForUserClockIn extends PerformClockInForUser {
//   type: 'start'
// };

// export interface PerformClockInForUserClockOut extends PerformClockInForUser {
//   type: 'finish'
// };

//response
export interface ClockInForUserByIdResponse {

}

export interface ClockInResponse {
  id: number;
  user_id: number;
  device_id: number;
  time: number; //timestamp
  type: 'start' | 'finish';
  latitude: string | number | null; //! unsure about string or number
  longitude: string | number | null; //! unsure about string or number
  photo: string | null;
  department_id: number | null;
  shift_id: number | null;
  removed: boolean;
};

//adhoc
interface Answers {
  timeclock_question_id: number;
  answer: number;
  trigger: string;
}