import { AppProvider } from "@/AppProvider";
import { Decorator } from "@storybook/react";

export const ProviderDecorator: Decorator = (Story) => {
  return (
    <AppProvider>
      <Story />
    </AppProvider>
  );
};