import { AppProviderDecorator } from '@/stories/AppProviderDecorator';
import type { Meta, StoryObj } from '@storybook/react';
import { Vault4626 } from '.';

const meta = {
  component: Vault4626,
  decorators: [AppProviderDecorator],
  argTypes: {
    chainId: {
      control: 'number',
    },
    vaultAddress: {
      control: 'text',
    },
  },
} satisfies Meta<typeof Vault4626>;

export default meta;
type Story = StoryObj<typeof Vault4626>;

export const Default: Story = {};
