import { ConfigObject } from "../types/generic-types";

export class Config {
  TOKEN: string | null = null;
  headers: { [key: string]: string } = {};

  setToken = async (newToken: string) => {
    this.TOKEN = newToken;

    this.updateHeaders();
  };

  setHeaders = async (newHeaders: { [key: string] : string }) => {
    this.headers = newHeaders;
  };

  private updateHeaders = () => {
    this.headers = {
      'Authorization' : `Bearer ${this.TOKEN}`
    };
  };

  createHeaders(options?: { [key: string]: string}): ConfigObject['headers'] {
    this.updateHeaders();
    
    let headers: ConfigObject['headers'] = {
      'Authorization': `Bearer ${this.TOKEN}`
    };

    if (options) {
      headers = {
        ...headers,
        ...options
      };
    };
    return headers = {
      'Content-Type': 'application/json',
      ...headers,
    };
  };

  getConfig() {
    const headers = this.createHeaders();

    const get = {
      method: 'GET',
      headers: headers
    };
    const post = {
      method: 'POST',
      headers: headers
    };
    const put = {
      method: 'PUT',
      headers: headers
    };
    const del = {
      method: 'DELETE',
      headers: headers
    };

    return {
      get,
      post,
      put,
      del
    };
  };
};

export const config = new Config();