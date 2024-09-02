import type { formSchema } from '@/vault4626/form';
import type { Params } from '@/vault4626/params';
import { erc20Abi, erc4626Abi, parseEventLogs, parseUnits } from 'viem';
import { useConfig, usePublicClient, useWriteContract } from 'wagmi';
import { simulateContract } from 'wagmi/actions';
import type { z } from 'zod';

interface Args {
  params: Params;
}

export const useActions = ({
  params: { assetAddress, chainId, vaultAddress },
}: Args) => {
  const config = useConfig();
  const { writeContractAsync, error, reset } = useWriteContract();
  const publicClient = usePublicClient({
    chainId,
  });

  const executeApprove = async (values: z.infer<typeof formSchema>) => {
    if (assetAddress === undefined) {
      throw new Error('assetAddress is undefined');
    }

    const { request } = await simulateContract(config, {
      address: assetAddress,
      abi: erc20Abi,
      functionName: 'approve',
      args: [vaultAddress, parseUnits(values.amount, values.decimals)],
      chainId,
      account: values.accountAddress,
    });

    const hash = await writeContractAsync(request);

    const receipt = await publicClient.waitForTransactionReceipt({
      hash,
    });
    const logs = parseEventLogs({
      abi: erc20Abi,
      eventName: 'Approval',
      logs: receipt.logs,
    });
    const allowanceFromReceipt = logs[0].args.value;
    return allowanceFromReceipt;
  };

  const executeDeposit = async (values: z.infer<typeof formSchema>) => {
    const { request } = await simulateContract(config, {
      address: vaultAddress,
      abi: erc4626Abi,
      functionName: 'deposit',
      args: [parseUnits(values.amount, values.decimals), values.accountAddress],
      chainId,
      account: values.accountAddress,
    });

    return writeContractAsync(request);
  };

  return {
    executeApprove,
    executeDeposit,
    error,
    reset,
  };
};

export type Actions = ReturnType<typeof useActions>;
