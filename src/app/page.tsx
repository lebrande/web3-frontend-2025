'use client';

import { VaultAddressForm } from '@/vaultAddressForm';
import { useRouter } from 'next/navigation';

function App() {
  const router = useRouter();

  return (
    <div className="max-w-2xl m-auto space-y-8 p-8">
      <VaultAddressForm
        onVaultAddressTyped={(address) => {
          router.push(`/vault/${address}`);
        }}
      />
    </div>
  );
}

export default App;
