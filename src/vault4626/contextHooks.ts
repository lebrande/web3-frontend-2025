import { useWatch } from 'react-hook-form';
import { toast } from 'sonner';
import { encodeFunctionData, erc4626Abi, formatUnits, parseUnits } from 'viem';
import type { z } from 'zod';
import { useVault4626 } from './context';
import type { formSchema } from './form';

const useSubmitApprove = () => {
  const { params, actions } = useVault4626();

  const submitApprove = async (values: z.infer<typeof formSchema>) => {
    const promise = actions.executeApprove(values);
    toast.promise(promise, {
      loading: 'Approving...',
      success: (approvedAmount) => {
        const amount = formatUnits(approvedAmount, values.decimals);
        return `Approved ${amount} ${params.symbol}`;
      },
      error: 'Error while approving',
    });
    const allowanceFromReceipt = await promise;
    params.setAllowanceFromReceipt(allowanceFromReceipt);
  };

  return submitApprove;
};

const useSubmitDeposit = () => {
  const { params, actions } = useVault4626();

  const submitDeposit = async (values: z.infer<typeof formSchema>) => {
    const promise = actions.executeDeposit(values);
    const amountDisplay = `${values.amount} ${params.symbol}`;
    toast.promise(promise, {
      loading: `Depositing ${amountDisplay}...`,
      success: `Deposited ${amountDisplay}`,
      error: `Error while depositing ${amountDisplay}`,
    });
    await promise;
  };

  return submitDeposit;
};

export const useOnSubmit = () => {
  const needsApproval = useNeedsApproval();
  const submitApprove = useSubmitApprove();
  const submitDeposit = useSubmitDeposit();

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (needsApproval) {
      return submitApprove(values);
    }
    return submitDeposit(values);
  };

  return onSubmit;
};

export const useNeedsApproval = () => {
  const {
    params: { decimals, allowance },
    form,
  } = useVault4626();

  const amount = useWatch({
    control: form.control,
    name: 'amount',
    defaultValue: '',
  });

  const needsApproval =
    decimals !== undefined && allowance !== undefined
      ? allowance < parseUnits(amount, decimals)
      : true;

  return needsApproval;
};

export const useEncodeTxToSimulate = () => {
  const {
    params: { chainId, setTxToSimulate, vaultAddress },
    form,
  } = useVault4626();

  const encodeTxToSimulate = () => {
    const { amount, decimals, accountAddress } = form.getValues();
    const calldata = encodeFunctionData({
      abi: erc4626Abi,
      functionName: 'deposit',
      args: [parseUnits(amount, decimals), accountAddress],
    });

    setTxToSimulate({
      account: accountAddress,
      to: vaultAddress,
      data: calldata,
      chainId,
    });
  };

  return encodeTxToSimulate;
};
