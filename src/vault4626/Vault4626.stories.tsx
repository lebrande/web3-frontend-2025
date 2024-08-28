import type { Meta, StoryObj } from '@storybook/react';

import { ProviderDecorator } from '@/stories/ProviderDecorator';
import { Vault4626 } from '@/vault4626/Vault4626';

const meta = {
  component: Vault4626,
  decorators: [ProviderDecorator],
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

export const Primary: Story = {};
