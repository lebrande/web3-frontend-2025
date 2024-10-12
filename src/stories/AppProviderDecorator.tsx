import { Providers } from '@/app/providers';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { Decorator } from '@storybook/react';

export const AppProviderDecorator: Decorator = (Story) => {
  return (
    <Providers>
      <div className="flex pb-4 justify-end">
        <ConnectButton />
      </div>
      <Story />
    </Providers>
  );
};
