//params

//body

export interface UpdatePayFieldByPayFieldIdBody extends CreatePayFieldOnUserBody {
  id: number;
  // user_id: number;
  // from_date: string;
  // to_date: string;
  // hourly_rate: number;
  // award_tags: string | string[];
  // yearly_salary: number;
  // award_template_organisation_id: number;
};

export interface CreatePayFieldOnUserBody {
  user_id: number;
  from_date: string;
  to_date: string;
  hourly_rate: number;
  award_tags: string | string[];
  yearly_salary: number;
  award_template_organisation_id: number;
};

export interface CreateAndUpdateMultiplePayFieldsOnUserBody {
  pay_fields: {
    user_id: number;
    from_date: string;
    to_date: string;
    hourly_rate: number;
    award_tags: string | string[];
    yearly_salary: number;
    award_template_organisation_id: number;
  }[];
};

//response
export interface GetUserPayFieldsResponse {
  id: number;
  reason_for_change: string;
  from_date: string;
  to_date: string;
  hourly_rate: number;
  yearly_salary: number;
  user_id: number;
  award_template_organisation_id: number;
};

export interface GetVerifiedPayFieldsByUserIdResponse {
  id: number;
  from: {
    date: string;
    valid: boolean;
  };
  to: {
    date: string;
    valid: boolean;
  };
  errors: string[];
};
//ad hoc
