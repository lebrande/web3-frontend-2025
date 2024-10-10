'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { type ReactNode, useState } from 'react';
import { type State, WagmiProvider } from 'wagmi';

import { Toaster } from '@/components/ui/sonner';
import { RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { arbitrum } from 'viem/chains';

import { getConfig } from '@/wagmi';

export function Providers(props: {
  children: ReactNode;
  initialState?: State;
}) {
  const [config] = useState(() => getConfig());
  const [queryClient] = useState(() => new QueryClient());

  return (
    <WagmiProvider config={config} initialState={props.initialState}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider theme={darkTheme()} initialChain={arbitrum.id}>
          {props.children}
          <Toaster />
        </RainbowKitProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </WagmiProvider>
  );
}
