//param
export interface GetLeaveBalancesParams {
  user_ids?: string[];
  updated_after?: number;
};
//body

export interface CreateLeaveBalanceBody {
  user_id: number;
  leave_type: string;
  hours: number;
};

export interface CreateMultipleLeaveBalancesBody {
  balances: CreateLeaveBalance[];
};

export interface UpdateLeaveBalanceBody {
  hours: number;
};

export interface UpdateLeaveBalanceByUserIdBody extends UpdateLeaveBalanceBody {
  leave_type: string;
  should_accrue: boolean;
};

export interface PredictLeaveBalanceBody {
  date: string;
};

//response

export interface LeaveBalanceResponse {
  id: number;
  user_id: number;
  leave_type: string;
  hours: number;
  should_accrue: boolean;
};

export interface CreateMultipleLeaveBalancesResponse {
  user_id: number;
  leave_type: string;
  hours: number;
};

export interface PredictLeaveBalanceResponse {
  prediction: number;
};

//adhoc

interface CreateLeaveBalance {
  user_id: number;
  leave_type: string;
  hours: number;
};