import type { ChainId } from '@/lib/types';
import { Content } from '@/vault4626/Content';
import { useActions } from '@/vault4626/actions';
import { Vault4626Provider } from '@/vault4626/context';
import { useTxForm } from '@/vault4626/form';
import { useParams } from '@/vault4626/params';
import type { Address } from 'viem';

export interface Props {
  chainId: ChainId;
  vaultAddress: Address;
}

export const Vault4626 = ({ chainId, vaultAddress }: Props) => {
  const params = useParams({
    chainId,
    vaultAddress,
  });
  const actions = useActions({ params });
  const form = useTxForm();

  return (
    <Vault4626Provider actions={actions} params={params} form={form}>
      <Vault4626Story />
    </Vault4626Provider>
  );
};

export const Vault4626Story = () => {
  return <Content />;
};
