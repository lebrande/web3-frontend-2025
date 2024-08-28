import { Vault4626 } from '@/vault4626/Vault4626';
import { arbitrum } from 'viem/chains';

const VAULT_ADDRESS = import.meta.env.VITE_VAULT_ADDRESS;

export const App = () => {
  return (
    <div className="max-w-xl m-auto space-y-8 p-8">
      <Vault4626 chainId={arbitrum.id} vaultAddress={VAULT_ADDRESS} />
    </div>
  );
};
