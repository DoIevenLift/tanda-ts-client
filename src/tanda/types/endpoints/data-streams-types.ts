//params

//body

export interface CreateDatastream {
  name: string;
  data_interval: 86400 | 3600 | 1800 | 900;
  default_stat_type: string;
};

export interface UpdateDatastream {
  name?: string;
  data_interval?: 86400 | 3600 | 1800 | 900;
  default_stat_type?: string;
};

//response

export interface DataStreamsResponse {
  id: number;
  name: string;
  source: string;
  data_interval: number;
  print_mode: string;
  roster_display_mode: string;
};


//adhoc