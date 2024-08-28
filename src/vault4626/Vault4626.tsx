import { useActions } from "@/vault4626/actions";
import { Content } from "@/vault4626/Content";
import { Vault4626Provider } from "@/vault4626/context";
import { useTxForm } from "@/vault4626/form";
import { useParams } from "@/vault4626/params";
import { ChainId } from "@/lib/types";
import { Address } from "viem";


export interface Props {
  chainId: ChainId;
  vaultAddress: Address;
}

export const Vault4626 = ({
  chainId,
  vaultAddress,
}: Props) => {
  const params = useParams({
    chainId,
    vaultAddress,
  });
  const actions = useActions({ params });
  const form = useTxForm();

  return (
    <Vault4626Provider
      actions={actions}
      params={params}
      form={form}
    >
      <Content />
    </Vault4626Provider>
  );
};

