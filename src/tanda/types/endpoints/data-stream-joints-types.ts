//param

//body

export interface CreateDataStream {
  data_stream_id: number;
  data_streamable_type: string;
  stat_type_id: number;
};

export interface CreateDataStreamJoinedToTeam extends CreateDataStream {
  data_streamable_id: number;
  rostering_ratio: number;
  stat_type_id: number;
};

export interface UpdateDataStreamJoin {
  rostering_ratio: number;
  
}


//response

export interface DataStreamJoinsResponse {
  id: number;
  data_stream_id: number;
  data_streamable_id: number;
  data_streamable_type: string;
  rostering_ratio: number;
  head_count_map: string;
};

export interface CreateDataStreamJoinResponse extends DataStreamJoinsResponse {
  stat_type_id: number;
};

//adhoc