//param

//body
export interface CreateDevice {
  nickname: string;
  location_id: number;
  data_provider?: any; //! bad prac but can't see type in Tanda.
  mobile_number?: string | number; //! guess no type provided in docs.
  sim_number?: string | number; //! guess no type provided in docs.
  serial_number?: string | number; //! guess no type provided in docs.
  imei?: string | number; //! guess no type provided in docs.
  model?: string | number; //! guess no type provided in docs.
};


//response
export interface DeviceResponse {
  id: number;
  location_id: number;
  nickname: string;
  returned: boolean;
  last_heard_from: number; // timestamp
  dispatch_date: string; // date
  location_specific: boolean;
};

//ad hoc
