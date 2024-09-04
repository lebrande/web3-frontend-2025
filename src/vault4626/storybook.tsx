import { MOCK_ADDRESS, sleep } from '@/lib/utils';
import { Vault4626Provider } from '@/vault4626/context';
import { useTxForm } from '@/vault4626/form';
import type { Decorator } from '@storybook/react';
import { parseUnits } from 'viem';
import { arbitrum } from 'viem/chains';

export const defaultArgs = {
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

export const ContextProviderDecorator: Decorator<StoryArgs> = (
  Story,
  context,
) => {
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
