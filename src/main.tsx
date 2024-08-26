import { Buffer } from 'buffer'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { WagmiProvider } from 'wagmi'

import { App } from './App.tsx'
import { config } from './wagmi.ts'

import './index.css'
import '@rainbow-me/rainbowkit/styles.css'
import { darkTheme, RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

/**
 * Workaround for BigInt serialization in Tanstack Query devtools.
 */
if (import.meta.env.DEV) {
  // @ts-expect-error
  BigInt.prototype.toJSON = function () {
    return this.toString();
  };
}

globalThis.Buffer = Buffer

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider theme={darkTheme()}>
          <App />
        </RainbowKitProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>,
)
