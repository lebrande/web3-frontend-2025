'use client';

import { Vault4626Breadcrumb } from '@/app/vault/[vaultAddress]/_components/Vault4626Breadcrumb';
import { IncorrectVaultAddressAlert } from '@/components/IncorrectVaultAddressAlert';
import { useVaultData } from '@/ercx/useVaultData';
import { addressSchema } from '@/lib/address';
import { Vault4626 } from '@/vault4626';
import { useChainId } from 'wagmi';

interface Props {
  params: {
    vaultAddress: string;
  };
}

const Page = (props: Props) => {
  const { data: vaultAddress, error: addressError } = addressSchema.safeParse(
    props.params.vaultAddress,
  );

  const chainId = useChainId();

  const { data: vaultData, error: vaultError } = useVaultData({
    chainId,
    vaultAddress,
  });

  const error = addressError || vaultError;
  const isValidErc4626 = Boolean(vaultData) && !error;

  return (
    <div className="max-w-xl m-auto space-y-8 p-8">
      <Vault4626Breadcrumb />
      {error && <IncorrectVaultAddressAlert />}
      {isValidErc4626 && vaultAddress && (
        <Vault4626 chainId={chainId} vaultAddress={vaultAddress} />
      )}
    </div>
  );
};

export default Page;
