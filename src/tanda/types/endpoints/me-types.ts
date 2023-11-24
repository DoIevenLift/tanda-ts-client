//types for the /me endpoint.

export interface CurrentUserResponse {
  id: number;
  name: string;
  email: string;
  photo: string | null;
  time_zone: string;
  utc_offset: number;
  organisation: string;
  organisation_id: number;
  locale: string;
  country: string;
  permissions: string[];
  valid_subscription: boolean;
  user_ids: number[];
  organisations: {
    name: string;
    id: number;
    user_id: number;
    locale: string;
    country: string;
  }[];
  updated_at: number; //timestamp.
};