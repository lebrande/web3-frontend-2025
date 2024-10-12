import { MOCK_ADDRESS, sleep } from '@/lib/utils';
import type { Meta, StoryObj } from '@storybook/react';
import type { Decorator } from '@storybook/react';
import { parseUnits } from 'viem';
import { arbitrum } from 'viem/chains';
import { Content } from './content';
import { Vault4626Provider } from './context';
import { useTxForm } from './form';

const defaultArgs = {
  chainId: arbitrum.id,
  vaultAddress: MOCK_ADDRESS,
  accountAddress: MOCK_ADDRESS,
  assetAddress: MOCK_ADDRESS,
  decimals: 6,
  symbol: 'USDC',
  balance: 1000,
  allowance: 500,
  accountAssetsDeposited: 100,
};

type StoryArgs = typeof defaultArgs & {
  setAllowanceFromReceipt: () => void;
  setTxToSimulate: () => void;
  executeApprove: () => void;
  executeDeposit: () => void;
};

const ContextProviderDecorator: Decorator<StoryArgs> = (Story, context) => {
  const {
    accountAddress,
    accountAssetsDeposited,
    allowance,
    assetAddress,
    chainId,
    balance,
    decimals,
    symbol,
    vaultAddress,

    setAllowanceFromReceipt,
    setTxToSimulate,
    executeApprove,
    executeDeposit,
  } = context.args;

  const form = useTxForm();

  return (
    <Vault4626Provider
      params={{
        accountAddress,
        accountAssetsDeposited: parseUnits(
          accountAssetsDeposited.toString(),
          decimals,
        ),
        allowance: parseUnits(allowance.toString(), decimals),
        assetAddress,
        chainId,
        balance: parseUnits(balance.toString(), decimals),
        decimals,
        setAllowanceFromReceipt,
        symbol,
        vaultAddress,
        setTxToSimulate,
        txToSimulate: undefined,
      }}
      form={form}
      actions={{
        error: null,
        executeApprove: async () => {
          await sleep(1000);
          executeApprove();
          return parseUnits('200', decimals);
        },
        executeDeposit: async () => {
          await sleep(1000);
          executeDeposit();
          return '0x';
        },
        reset: () => {},
      }}
    >
      <Story />
    </Vault4626Provider>
  );
};

const meta = {
  component: Content,
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
} satisfies Meta<typeof Content>;

export default meta;
type Story = StoryObj<typeof Content>;

export const Default: Story = {};
