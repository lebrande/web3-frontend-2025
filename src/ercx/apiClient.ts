import axios from 'axios';

const API_KEY = process.env.NEXT_PUBLIC_ERCX_API_TOKEN as unknown;

export const ercxApiClient = axios.create({
  baseURL: 'https://ercx.runtimeverification.com',
  headers:
    typeof API_KEY === 'string'
      ? {
          'X-API-KEY': API_KEY,
        }
      : undefined,
});
