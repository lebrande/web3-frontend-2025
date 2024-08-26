import { Vault4626 } from "@/components/vault4626/Vault4626"
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { arbitrum } from "viem/chains";

const VAULT_ADDRESS = import.meta.env.VITE_VAULT_ADDRESS;

export const App = () => {
  return (
    <>
      <div className="flex justify-between items-center py-3 px-4">
        <h1 className="text-2xl font-bold">Web3 Frontend 2025</h1>
        <ConnectButton
          showBalance={true}
          chainStatus={{
            smallScreen: 'full',
            largeScreen: 'full',
          }}
          accountStatus={{
            smallScreen: 'avatar',
            largeScreen: 'full'
          }}
        />
      </div>
      <div className='max-w-xl m-auto space-y-8 p-8'>
        <Vault4626
          chainId={arbitrum.id}
          vaultAddress={VAULT_ADDRESS}
        />
      </div>
    </>
  )
}
