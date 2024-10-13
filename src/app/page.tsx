'use client';

import { VaultAddressForm } from '@/vaultAddressForm';
import { useRouter } from 'next/navigation';

function App() {
  const router = useRouter();

  return (
    <div className="h-[40rem] flex justify-center items-center">
      <div className="max-w-2xl m-auto space-y-8 p-8">
        <h1 className="text-2xl font-bold">Next Level DeFi Vault Experience</h1>
        <p>
          Check any vault against ERC-4626 standart and execute deposits and
          withdrawals. Look up vault statistics and breakdown any relevant
          information you can find in the web.
        </p>
        <p>Just type the vault address here:</p>

        <VaultAddressForm
          onVaultAddressTyped={(address) => {
            router.push(`/vault/${address}`);
          }}
        />
      </div>
    </div>
  );
}

export default App;
