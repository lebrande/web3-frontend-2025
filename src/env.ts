import { z } from 'zod';

const envSchema = z.object({
  WC_PROJECT_ID: z.string(),
  SENTRY_DSN: z.string(),
  ERCX_API_TOKEN: z.string(),
  ARBITRUM_RPC: z.string(),
  FORK_RPC: z.string(),
  TENDERLY_ACCESS_TOKEN: z.string(),
  TENDERLY_ACCOUNT_SLUG: z.string(),
  TENDERLY_PROJECT_SLUG: z.string(),
});

const RAW_ENV =
  typeof process === 'undefined'
    ? {
        WC_PROJECT_ID: import.meta.env.VITE_WC_PROJECT_ID as string,
        SENTRY_DSN: import.meta.env.VITE_SENTRY_DSN as string,
        ERCX_API_TOKEN: import.meta.env.VITE_ERCX_API_TOKEN as string,
        ARBITRUM_RPC: import.meta.env.VITE_ARBITRUM_RPC as string,
        FORK_RPC: import.meta.env.VITE_FORK_RPC as string,
        TENDERLY_ACCESS_TOKEN: import.meta.env
          .VITE_TENDERLY_ACCESS_TOKEN as string,
        TENDERLY_ACCOUNT_SLUG: import.meta.env
          .VITE_TENDERLY_ACCOUNT_SLUG as string,
        TENDERLY_PROJECT_SLUG: import.meta.env
          .VITE_TENDERLY_PROJECT_SLUG as string,
      }
    : {
        WC_PROJECT_ID: process.env.NEXT_PUBLIC_WC_PROJECT_ID as string,
        SENTRY_DSN: process.env.NEXT_PUBLIC_SENTRY_DSN as string,
        ERCX_API_TOKEN: process.env.NEXT_PUBLIC_ERCX_API_TOKEN as string,
        ARBITRUM_RPC: process.env.NEXT_PUBLIC_ARBITRUM_RPC as string,
        FORK_RPC: process.env.NEXT_PUBLIC_FORK_RPC as string,
        TENDERLY_ACCESS_TOKEN: process.env
          .NEXT_PUBLIC_TENDERLY_ACCESS_TOKEN as string,
        TENDERLY_ACCOUNT_SLUG: process.env
          .NEXT_PUBLIC_TENDERLY_ACCOUNT_SLUG as string,
        TENDERLY_PROJECT_SLUG: process.env
          .NEXT_PUBLIC_TENDERLY_PROJECT_SLUG as string,
      };

export const ENV = envSchema.parse(RAW_ENV);
