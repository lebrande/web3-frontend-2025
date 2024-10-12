import { ENV } from '@/env';
import axios from 'axios';

const ACCESS_TOKEN = ENV.TENDERLY_ACCESS_TOKEN;

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
