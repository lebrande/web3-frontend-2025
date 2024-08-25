import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, useWatch } from "react-hook-form"
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
import { useParams } from "@/components/vault4626/params";
import { useActions } from "@/components/vault4626/actions";
import { addressSchema, NUMBER_REGEX } from "@/constants";

export const formSchema = z
  .object({
    amount: z
      .string({ required_error: 'You have to enter amount' })
      .refine((value) => value !== '', 'You have to enter amount')
      .refine(
        (value) => NUMBER_REGEX.test(value),
        'Amount must be a valid number',
      )
      .refine(async (value) => +value > 0, 'Amount must be greater than 0'),
    balance: z.bigint().positive(),
    decimals: z.number().positive(),
    accountAddress: addressSchema,
  })
  .refine(
    ({ amount, balance, decimals }) => {
      const _amount = parseUnits(amount, decimals);
      return _amount <= balance;
    },
    ({ balance, decimals }) => {
      return {
        message: `Amount exceeds balance. Max: ${formatUnits(balance, decimals)}`,
        path: ['amount'],
      };
    },
  );

export const Vault4626 = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Vault</CardTitle>
      </CardHeader>
      <CardContent>
        <VaultForm />
      </CardContent>
    </Card>
  );
};

const VaultForm = () => {
  const { address: accountAddress } = useAccount();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: '',
      balance: 0n,
      decimals: undefined,
      accountAddress: undefined,
    },
    mode: 'onChange',
  });

  const params = useParams();
  const {
    decimals,
    symbol,
    balance,
    allowance,
  } = params;

  const {
    executeApprove,
    executeDeposit,
  } = useActions({ params });

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
    console.log({
      values,
      decimals,
      accountAddress,
    });

    try {
      if (needsApproval) {
        await executeApprove(values);
        return;
      }
      await executeDeposit(values);
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