import { z } from "zod"
import { addressSchema, NUMBER_REGEX } from "@/constants";
import { formatUnits, parseUnits } from "viem";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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

export const useTxForm = () => {
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

  return form;
}

export type TxForm = ReturnType<typeof useTxForm>;