import type { Meta, StoryObj } from '@storybook/react';
 
import { Vault4626 } from '@/components/vault4626/Vault4626';
import { ProviderDecorator } from '@/stories/ProviderDecorator';
 
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