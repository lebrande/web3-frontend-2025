'use client';

import { Navbar } from '@/components/Navbar';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useVaultData } from '@/ercx/useVaultData';
import { Vault4626 } from '@/vault4626';
import { VaultAddressForm } from '@/vaultAddressForm';
import { TerminalIcon } from 'lucide-react';
import { useState } from 'react';
import type { Address } from 'viem';
import { useChainId } from 'wagmi';

function App() {
  const [selectedAddress, setSelectedAddress] = useState<Address>();
  const chainId = useChainId();

  const { data: vaultData, error } = useVaultData({
    chainId,
    vaultAddress: selectedAddress,
  });

  const isValidErc4626 = Boolean(vaultData) && !error;

  return (
    <>
      <Navbar />
      <div className="max-w-xl m-auto space-y-8 p-8">
        <VaultAddressForm
          selectedAddress={selectedAddress}
          setSelectedAddress={setSelectedAddress}
        />
        {error && <IncorrectVaultAddressAlert />}
        {selectedAddress && isValidErc4626 && (
          <Vault4626 chainId={chainId} vaultAddress={selectedAddress} />
        )}
      </div>
    </>
  );
}

const IncorrectVaultAddressAlert = () => {
  return (
    <Alert variant="destructive">
      <TerminalIcon className="h-4 w-4" />
      <AlertTitle>This is not a valid ERC-4626 vault address.</AlertTitle>
      <AlertDescription>
        We found an error while trying to fetch data from the vault. Please make
        sure you have entered a valid ERC-4626 vault address.
      </AlertDescription>
    </Alert>
  );
};

export default App;
