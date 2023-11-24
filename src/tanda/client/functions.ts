import { Config } from "./config";

const requestErrorHandling = async (status: number, message: string | null) => {
  return {
    error: true,
    message: message || 'Something went wrong.',
    code: status
  }
};


export const get = async <T, U>(endpoint: string, config: Config, params?: U) => {
  const url = new URL(`${endpoint}`);

  if (params) {
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, value.toString());
      }
    }
  };

  const request = await fetch(url, {
    ...config.getConfig().get,
  });

  if (request.status !== 200 && request.status !== 201) {
    return requestErrorHandling(request.status, request.statusText);
  };

  const response: T = await request.json();
  return response;
};

//! need to test and fix.
export const put = async <T, U, A>(endpoint: string, config: Config, body: A, params?: U) => {
  const url = new URL(`${endpoint}`);

  if (params) {
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, value.toString());
      };
    };
  };

  const request = await fetch(url, {
    ...config.getConfig().put,
    body: JSON.stringify(body),
  });

  if (request.status !== 200 && request.status !== 201) {
    return requestErrorHandling(request.status, request.statusText);
  }

  const response: T = await request.json();
  return response;
};

//! need to test and fix.
export const post = async <T, U, A>(endpoint: string, config: Config, body: A, params?: U) => {
  const url = new URL(`${endpoint}`);

  if (params) {
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, value.toString());
      };
    };
  };

  const request = await fetch(url, {
    ...config.getConfig().post,
    body: JSON.stringify(body),
  });

  if (request.status !== 200 && request.status !== 201) {
    return requestErrorHandling(request.status, request.statusText);
  }

  const response: T = await request.json();
  return response;
};

export const del = async <T, U>(endpoint: string, config: Config, params?: U) => {
  const url = new URL(`${endpoint}`);

  if (params) {
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, value.toString());
      };
    };
  };

  const request = await fetch(url, {
    ...config.getConfig().del,
  });

  if (request.status !== 200 && request.status !== 201) {
    return requestErrorHandling(request.status, request.statusText);
  }

  const response: T = await request.json();
  return response;
};