import { Buffer } from 'buffer'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from '@/App.tsx'
import '@/index.css'
import '@rainbow-me/rainbowkit/styles.css'
import { AppProvider } from '@/AppProvider'

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

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>,
)
