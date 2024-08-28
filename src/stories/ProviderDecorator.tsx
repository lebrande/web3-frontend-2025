import { AppProvider } from '@/AppProvider';
import type { Decorator } from '@storybook/react';

export const ProviderDecorator: Decorator = (Story) => {
  return (
    <AppProvider>
      <Story />
    </AppProvider>
  );
};
