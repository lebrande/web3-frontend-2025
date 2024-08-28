import { Buffer } from 'buffer';
import { App } from '@/App.tsx';
import React from 'react';
import ReactDOM from 'react-dom/client';
import '@/index.css';
import '@rainbow-me/rainbowkit/styles.css';
import { AppProvider } from '@/AppProvider';

/**
 * Workaround for BigInt serialization in Tanstack Query devtools.
 */
if (import.meta.env.DEV) {
  // @ts-expect-error
  BigInt.prototype.toJSON = function () {
    return this.toString();
  };
}

globalThis.Buffer = Buffer;

// biome-ignore lint/style/noNonNullAssertion: This is the root element
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>,
);
