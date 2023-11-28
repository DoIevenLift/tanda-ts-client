//param

//body

export interface CreateQualification {
  name: string;
  maximum_hours: number; //! not sure about this one.
};

export interface UpdateQualification {
  name?: string;
  maximum_hours?: number; //! not sure about this one.
};

//response

export interface QualificationsResponse {
  id: number;
  name: string;
  maximum_hours: number; //! not sure about this one.
};

//adhoc