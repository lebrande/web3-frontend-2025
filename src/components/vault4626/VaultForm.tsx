import { z } from "zod"
import { useWatch } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useAccount } from "wagmi";
import { BaseError, formatUnits, parseUnits } from "viem";
import { useEffect } from "react";
import { useVault4626 } from "@/components/vault4626/context"
import { formSchema } from "@/components/vault4626/form"

export const VaultForm = () => {
  const {
    form,
    params,
    actions,
  } = useVault4626();
  const { address: accountAddress } = useAccount();

  const {
    decimals,
    symbol,
    balance,
    allowance,
  } = params;

  useEffect(() => {
    if (balance !== undefined) {
      form.setValue('balance', balance);
    }
  }, [balance]);

  useEffect(() => {
    if (decimals !== undefined) {
      form.setValue('decimals', decimals);
    }
  }, [decimals]);

  useEffect(() => {
    if (accountAddress !== undefined) {
      form.setValue('accountAddress', accountAddress);
    }
  }, [accountAddress]);

  const amount = useWatch({
    control: form.control,
    name: 'amount',
    defaultValue: '',
  });

  const needsApproval = (decimals !== undefined && allowance !== undefined)
    ? allowance < parseUnits(amount, decimals)
    : true;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (needsApproval) {
        await actions.executeApprove(values);
        return;
      }
      await actions.executeDeposit(values);
    } catch (error) {
      if (error instanceof BaseError) {
        form.setError("root", {
          message: error.shortMessage,
        });
      }
    }
  }

  const balanceDisplay = (balance && decimals)
    ? formatUnits(balance, decimals)
    : '0';

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <div className="flex justify-between">
                <FormLabel>Amount</FormLabel>
                <div className="text-xs text-muted-foreground">
                  Balance: {balanceDisplay}
                </div>
              </div>
              <div className="flex items-center">
                <FormControl>
                  <Input placeholder="0" {...field} />
                </FormControl>
                <div className="-ml-20 w-20 text-right font-bold pr-3">
                  {symbol}
                </div>
              </div>
              <FormDescription>
                How much ERC20 token you'd like to deposit in the vault
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="space-y-2">
          <div className="flex gap-4">
            <Button
              type="submit"
              disabled={!needsApproval}
            >
              {needsApproval ? 'Approve' : 'Approved'}
            </Button>
            <Button
              type="submit"
              disabled={needsApproval}
            >
              Deposit
            </Button>
          </div>
          {allowance !== undefined && decimals !== undefined && (
            <FormDescription>
              Current allowance: {formatUnits(allowance, decimals)} {symbol}
            </FormDescription>
          )}
          {form.formState.errors.root && (
            <p className="text-[0.8rem] font-medium text-destructive">
              {form.formState.errors.root.message}
            </p>
          )}
        </div>
      </form>
    </Form>
  );
};