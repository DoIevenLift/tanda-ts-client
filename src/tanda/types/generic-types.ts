export interface ConfigObject {
  method: string;
  headers: {
    [key: string] : string;
  }
};

export interface GetVersionsResponse {
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