import type { Chain } from '@rainbow-me/rainbowkit';
import { mainnet } from 'viem/chains';

export const FORK_ETHEREUM_MAINNET = {
  ...mainnet,
  name: '[FORK] Ethereum mainnet',
  nativeCurrency: { name: '[FORK] Ethereum', symbol: 'FORKETH', decimals: 18 },
  rpcUrls: {
    default: { http: [import.meta.env.VITE_FORK_RPC] },
  },
} as const satisfies Chain;
