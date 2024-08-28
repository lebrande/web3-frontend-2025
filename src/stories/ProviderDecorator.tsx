import { AppProvider } from '@/AppProvider';
import { Navbar } from '@/components/Navbar';
import type { Decorator } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';

export const ProviderDecorator: Decorator = (Story) => {
  return (
    <AppProvider>
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
      <Story />
    </AppProvider>
  );
};
