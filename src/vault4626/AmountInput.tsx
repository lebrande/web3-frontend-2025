import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useVault4626 } from '@/vault4626/context';
import { formatUnits } from 'viem';

export const AmountInput = () => {
  const {
    form,
    params: { decimals, symbol, balance },
  } = useVault4626();

  const balanceDisplay =
    balance && decimals ? formatUnits(balance, decimals) : '0';

  return (
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
  );
};
