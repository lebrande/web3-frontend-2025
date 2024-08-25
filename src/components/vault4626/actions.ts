import { formSchema } from "@/components/vault4626/Vault4626";
import { erc20Abi, erc4626Abi, parseUnits } from "viem";
import { simulateContract } from "wagmi/actions";
import { arbitrum } from "viem/chains";
import { useConfig, useWriteContract } from "wagmi";
import { z } from "zod";
import { Params } from "@/components/vault4626/params";

const VAULT_ADDRESS = import.meta.env.VITE_VAULT_ADDRESS;

interface Args {
  params: Params;
}

export const useActions = ({
  params: { assetAddress },
}: Args) => {
  const config = useConfig();
  const { writeContractAsync } = useWriteContract();

  const executeApprove = async (values: z.infer<typeof formSchema>) => {
    if (assetAddress === undefined) {
      throw new Error('assetAddress is undefined');
    }

    const { request } = await simulateContract(config, {
      address: assetAddress,
      abi: erc20Abi,
      functionName: 'approve',
      args: [VAULT_ADDRESS, parseUnits(values.amount, values.decimals)],
      chainId: arbitrum.id,
    });

    return writeContractAsync(request);
  }

  const executeDeposit = async (values: z.infer<typeof formSchema>) => {
    const { request } = await simulateContract(config, {
      address: VAULT_ADDRESS,
      abi: erc4626Abi,
      functionName: 'deposit',
      args: [parseUnits(values.amount, values.decimals), values.accountAddress],
      chainId: arbitrum.id,
    });

    return writeContractAsync(request);
  }

  return {
    executeApprove,
    executeDeposit,
  };
}