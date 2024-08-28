import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { arbitrum } from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'Web3 Frontend 2025',
  projectId: import.meta.env.VITE_WC_PROJECT_ID,
  chains: [arbitrum],
  ssr: false,
});

declare module 'wagmi' {
  interface Register {
    config: typeof config;
  }
}
