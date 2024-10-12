import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { headers } from 'next/headers';
import type { ReactNode } from 'react';
import { cookieToInitialState } from 'wagmi';
import '@rainbow-me/rainbowkit/styles.css';
import { Navbar } from '@/components/Navbar';
import { cn } from '@/lib/utils';
import { getConfig } from '../wagmi';
import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Web3 Frontend 2025',
  description: 'A Next.js starter for web3 projects',
};

export default function RootLayout(props: { children: ReactNode }) {
  const initialState = cookieToInitialState(
    getConfig(),
    headers().get('cookie'),
  );
  return (
    <html lang="en">
      <body
        className={cn(
          'dark bg-background text-foreground min-h-screen',
          inter.className,
        )}
      >
        <Providers initialState={initialState}>
          <Navbar />
          {props.children}
        </Providers>
      </body>
    </html>
  );
}
