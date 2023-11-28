//param

export interface StoreStatsParams {
  from: string;
  to: string;
  type?: string;
};

// body

export interface CreateStoreStats {
  time: number;
  stat: number;
  type: string;
};

export interface CreateMultipleStoreStats {
  stats: CreateStoreStats[];
};

export interface DeleteStoreStats {
  stats: {
    time: number;
    stat: 0; // 0 is required.
    type: string;
  }[];
};

export interface CreateStoreStatsByDataStream {
  data_stream_id: number;
  time: number;
  stat: number;
  type: string;
};

export interface CreateMultipleStoreStatsByDataStream extends CreateStoreStatsByDataStream {
  stats: CreateStoreStatsByDataStream[];
};

//response

export interface StoreStatsResponse {
  id: number;
  time: number; // timestamp
  stat: number;
  type: string;
  datastream_id: number;
};

//ad hoc