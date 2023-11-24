//params

//body

export interface CreateShiftDetailBody {
  name: string;
  department_id: number;
};

export interface UpdateShiftDetails {
  name: string;
};

//response

export interface ShiftDetailsResponse {
  id: number;
  department_id: number;
  name: string;
};

//ad hoc