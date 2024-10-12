import { ENV } from '@/env';
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
      walletConnect({ projectId: ENV.WC_PROJECT_ID }),
    ],
    storage: createStorage({
      storage: cookieStorage,
    }),
    ssr: true,
    transports: {
      [arbitrum.id]: http(ENV.ARBITRUM_RPC),
      [FORK_ETHEREUM_MAINNET.id]: http(ENV.FORK_RPC),
    },
  });
}

declare module 'wagmi' {
  interface Register {
    config: ReturnType<typeof getConfig>;
  }
}
