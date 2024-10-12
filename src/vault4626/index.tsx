import type { ChainId } from '@/lib/types';
import type { Address } from 'viem';
import { useActions } from './actions';
import { Content } from './content';
import { Vault4626Provider } from './context';
import { useTxForm } from './form';
import { useParams } from './params';

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
      <Content />
    </Vault4626Provider>
  );
};
