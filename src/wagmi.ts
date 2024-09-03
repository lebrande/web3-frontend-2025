import { FORK_ETHEREUM_MAINNET } from '@/forkChain';
import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { http } from 'wagmi';
import { arbitrum } from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'Web3 Frontend 2025',
  projectId: import.meta.env.VITE_WC_PROJECT_ID,
  chains: [arbitrum, FORK_ETHEREUM_MAINNET],
  transports: {
    [arbitrum.id]: http(import.meta.env.VITE_ARBITRUM_RPC),
    [FORK_ETHEREUM_MAINNET.id]: http(import.meta.env.VITE_FORK_RPC),
  },
  ssr: false,
});

declare module 'wagmi' {
  interface Register {
    config: typeof config;
  }
}
