import { Buffer } from 'buffer';
import React from 'react';
import ReactDOM from 'react-dom/client';
import '@/index.css';
import '@rainbow-me/rainbowkit/styles.css';
import { AppProvider } from '@/AppProvider';
import { router } from '@/router';
import * as Sentry from '@sentry/react';
import { RouterProvider } from 'react-router-dom';

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration(),
  ],
  tracesSampleRate: 1.0,
  tracePropagationTargets: ['localhost'],
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
});

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
      <RouterProvider router={router} />
    </AppProvider>
  </React.StrictMode>,
);
