
// params

export interface GetLocationsParams {
  updated_after?: number;
  platform?: boolean;
  show_business_hours?: boolean;
};

// body

export interface CreateLocationBody {
  name: string;
};

export interface CreateLocationWithDetailsBody extends CreateLocationBody {
  short_name: string;
  latitude: number;
  longitude: number;
  address: string;
  public_holiday_regions: string[];
  specific_holiday_dates: SpecificHolidayDates[];
};

export interface UpdateLocationBody { //! needs to be tested.
  name?: string;
  short_name?: string;
  latitude?: number;
  longitude?: number;
  business_hours?: {
    business_hours : BusinessHours[];
  };
};

// responses
export interface LocationsResponse {
  id: number;
  name: string;
  short_name: string;
  latitude: number;
  longitude: number;
  address: string;
  time_zone: string;
  utc_offset: number;
  public_holiday_regions: string[];
  specific_holiday_dates: SpecificHolidayDates[];
  business_day_cutoff: number;
  business_hours: BusinessHours[];
  record_id: number;
};

export interface LocationVersionsResponse {
  version_id: number;
  time: number; // timestamp
  event: string; // 'create' | 'update' | 'delete' //! potentially.
  author: {
    id: number;
    name: string;
  };
  item_id: number;
  item_type: string;
  changes: {
    field: string;
    previous: string | number | boolean;
    updated: string | number | boolean;
  }[];
};


// ad hoc

interface SpecificHolidayDates {
  date: string;
  from: number;
  to: number;
};

interface BusinessHours {
  weekday: number; // 0 = sunday, 1 = monday.
  start: string;
  finish: string;
};
