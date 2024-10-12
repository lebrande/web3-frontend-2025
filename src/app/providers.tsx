'use client';

import { Toaster } from '@/components/ui/sonner';
import { getConfig } from '@/wagmi';
import { RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { type ReactNode, useState } from 'react';
import { arbitrum } from 'viem/chains';
import { type State, WagmiProvider } from 'wagmi';

interface Props {
  children: ReactNode;
  initialState?: State;
}

export const Providers = ({ children, initialState }: Props) => {
  const [config] = useState(() => getConfig());
  const [queryClient] = useState(() => new QueryClient());

  return (
    <WagmiProvider config={config} initialState={initialState}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider theme={darkTheme()} initialChain={arbitrum.id}>
          {children}
          <Toaster />
        </RainbowKitProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </WagmiProvider>
  );
};
