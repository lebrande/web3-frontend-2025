import type { Meta, StoryObj } from '@storybook/react';

import { Button } from './button';

const meta = {
  component: Button,
  tags: ['autodocs'],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    variant: 'default',
    size: 'default',
    children: 'Button',
  },
};
