import type { Chain } from '@rainbow-me/rainbowkit';
import { mainnet } from 'viem/chains';

export const FORK_ETHEREUM_MAINNET = {
  ...mainnet,
  name: '[FORK] Ethereum mainnet',
  nativeCurrency: { name: '[FORK] Ethereum', symbol: 'FORKETH', decimals: 18 },
  rpcUrls: {
    // biome-ignore lint/style/noNonNullAssertion: query/enabled
    default: { http: [process.env.NEXT_PUBLIC_FORK_RPC!] },
  },
} as const satisfies Chain;
