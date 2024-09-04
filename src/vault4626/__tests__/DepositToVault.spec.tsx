import { MOCK_ADDRESS } from '@/lib/utils';
import { Vault4626 } from '@/vault4626/Vault4626';
import { useActions } from '@/vault4626/actions';
import { useParams } from '@/vault4626/params';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { parseUnits } from 'viem';
import { arbitrum } from 'viem/chains';
import { type Mock, describe, expect, it, vi } from 'vitest';

vi.mock('@/vault4626/params');
vi.mock('@/vault4626/actions');

const executeDepositSpy = vi.fn();
const executeApprovalSpy = vi.fn();

describe('Vault4626', () => {
  it('Deposit to vault', async () => {
    (useParams as Mock<typeof useParams>).mockReturnValue({
      accountAddress: MOCK_ADDRESS,
      accountAssetsDeposited: 0n,
      allowance: parseUnits('50', 6),
      balance: parseUnits('50', 6),
      assetAddress: MOCK_ADDRESS,
      chainId: arbitrum.id,
      decimals: 6,
      symbol: 'USDC',
      vaultAddress: '0x',
      setAllowanceFromReceipt: vi.fn(),
      setTxToSimulate: vi.fn(),
      txToSimulate: undefined,
    });
    (useActions as Mock<typeof useActions>).mockReturnValue({
      error: null,
      executeApprove: executeApprovalSpy,
      executeDeposit: async (args) => {
        executeDepositSpy(args);
        return '0x';
      },
      reset: vi.fn(),
    });

    render(
      <Vault4626
        chainId={arbitrum.id}
        vaultAddress="0x1234567890123456789012345678901234567890"
      />,
    );

    const user = userEvent.setup();

    screen.getByText('Balance: 50');
    screen.getByText('Current allowance: 50 USDC');

    const amountInput = screen.getByLabelText('Amount');
    expect(amountInput).toHaveValue('');

    const depositSubmitButton = screen.getByRole('button', { name: 'Deposit' });
    expect(depositSubmitButton).toBeEnabled();

    const approveSubmitButton = screen.getByRole('button', {
      name: 'Approved',
    });
    expect(approveSubmitButton).toBeDisabled();

    await user.type(amountInput, '10');
    expect(amountInput).toHaveValue('10');

    expect(depositSubmitButton).toBeEnabled();
    expect(approveSubmitButton).toBeDisabled();
    expect(approveSubmitButton).toHaveTextContent('Approve');

    await user.clear(amountInput);
    await user.type(amountInput, '100');
    expect(amountInput).toHaveValue('100');

    screen.getByText('Amount exceeds balance. Max: 50');
    expect(depositSubmitButton).toBeDisabled();
    expect(approveSubmitButton).toBeDisabled();

    await user.clear(amountInput);
    await user.type(amountInput, '50');
    expect(amountInput).toHaveValue('50');

    expect(approveSubmitButton).toBeDisabled();
    expect(depositSubmitButton).toBeEnabled();

    expect(executeDepositSpy).toBeCalledTimes(0);
    expect(executeApprovalSpy).toBeCalledTimes(0);

    await user.click(depositSubmitButton);

    expect(executeDepositSpy).toBeCalledTimes(1);
    expect(executeApprovalSpy).toBeCalledTimes(0);

    expect(executeDepositSpy).toBeCalledWith({
      accountAddress: expect.any(String),
      amount: '50',
      balance: 50000000n,
      decimals: 6,
    });
  });
});
