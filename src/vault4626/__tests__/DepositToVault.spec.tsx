import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Vault4626 } from '@/vault4626/Vault4626'
import { arbitrum } from 'viem/chains';

describe('Vault4626', () => {
  it('Deposit to vault', () => {
    render(
      <Vault4626
        chainId={arbitrum.id}
        vaultAddress="0x1234567890123456789012345678901234567890"
      />
    );

    const amountInput = screen.getByLabelText('Amount');

    expect(amountInput).toHaveValue('0');
  })
});