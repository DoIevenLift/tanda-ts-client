//param

//body

export interface EnableAwardTemplate {
  award_template_id: number;
};

export interface EnableAwardTemplateWithLeaveTypes extends EnableAwardTemplate {
  extracted_leave_types: boolean; //! this ccould be 'true' rather than and false
  replace_leave_types: boolean; //! this could be 'true' rather than and false
};

//response

export interface AwardTemplatesResponse {
  award_template_id: number;
  name: string;
  identifier: string;
  award_template_organisation_id: number;
};

//adhoc