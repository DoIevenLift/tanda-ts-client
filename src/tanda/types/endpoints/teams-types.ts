
// params

export interface GetTeamsParams {
  updated_after?: number;
  platform?: boolean;
  page?: number;
  page_size?: number;
};

// body

export interface CreateBasicTeam {
  name: string;
  location_id: number;
}

export interface CreateTeamWithDetails extends CreateBasicTeam {
  export_name: string;
  colour: string;
  team_group: string;
  qualification_ids: number[];
  manager_ids: number[];
  user_ids: number[];
};

export interface UpdateTeamBody {
  name?: string;
  user_ids?: number[];
  manager_ids?: number[];
  qualification_ids?: number[];
};

// response

export interface TeamsResponseAsEmployee {
  id: number;
  name: string;
  location_id: number;
  colour: string;
};

export interface TeamsResponseAsManager extends TeamsResponseAsEmployee {
  staff: string[];
  managers: string[];
  associated_tags: string[];
  qualification_ids: number[];
  assisting_team_ids: number[];
  team_group: string;
  record_id: string;
};

export interface CreateTeamResponse {
  id: number;
  location_id: number;
  name: string;
  export_name: string | null;
  colour: string | null;
  staff: string[] | [];
  managers: string[] | [];
  associated_tags?: string[] | [];
  qualification_ids?: number[] | [];
  assisting_team_ids?: number[] | [];
  team_group?: string | null;
  record_id: string | null;
};


// ad hoc