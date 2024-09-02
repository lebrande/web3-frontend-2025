import { Vault4626Story } from '@/vault4626/Vault4626';
import { ContextProviderDecorator, defaultArgs } from '@/vault4626/storybook';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  component: Vault4626Story,
  decorators: [
    // @ts-expect-error
    ContextProviderDecorator,
  ],
  argTypes: {
    setAllowanceFromReceipt: { action: 'setAllowanceFromReceipt' },
    executeApprove: { action: 'executeApprove' },
    executeDeposit: { action: 'executeDeposit' },
  },
  args: defaultArgs,
} satisfies Meta<typeof Vault4626Story>;

export default meta;
type Story = StoryObj<typeof Vault4626Story>;

export const Primary: Story = {};
