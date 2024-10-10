import axios from 'axios';

const ACCESS_TOKEN = process.env.NEXT_PUBLIC_TENDERLY_ACCESS_TOKEN as unknown;

export const tenderlyApiClient = axios.create({
  baseURL: 'https://api.tenderly.co/api',
  headers:
    typeof ACCESS_TOKEN === 'string'
      ? {
          'content-type': 'application/JSON',
          'X-Access-Key': ACCESS_TOKEN,
        }
      : undefined,
});
