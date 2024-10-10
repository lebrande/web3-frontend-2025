import { FORK_ETHEREUM_MAINNET } from '@/forkChain';
import { http, cookieStorage, createConfig, createStorage } from 'wagmi';
import { arbitrum } from 'wagmi/chains';
import { coinbaseWallet, injected, walletConnect } from 'wagmi/connectors';

export function getConfig() {
  return createConfig({
    chains: [arbitrum, FORK_ETHEREUM_MAINNET],
    connectors: [
      injected(),
      coinbaseWallet(),
      // biome-ignore lint/style/noNonNullAssertion: query/enabled
      walletConnect({ projectId: process.env.NEXT_PUBLIC_WC_PROJECT_ID! }),
    ],
    storage: createStorage({
      storage: cookieStorage,
    }),
    ssr: true,
    transports: {
      [arbitrum.id]: http(process.env.NEXT_PUBLIC_ARBITRUM_RPC),
      [FORK_ETHEREUM_MAINNET.id]: http(process.env.NEXT_PUBLIC_FORK_RPC),
    },
  });
}

declare module 'wagmi' {
  interface Register {
    config: ReturnType<typeof getConfig>;
  }
}
