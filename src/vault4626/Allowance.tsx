import { FormDescription } from '@/components/ui/form';
import { Skeleton } from '@/components/ui/skeleton';
import { useVault4626 } from '@/vault4626/context';
import { formatUnits } from 'viem';

export const Allowance = () => {
  const {
    params: { decimals, symbol, allowance },
  } = useVault4626();

  if (allowance === undefined || decimals === undefined) {
    return <Skeleton className="h-12" />;
  }

  return (
    <FormDescription>
      Current allowance: {formatUnits(allowance, decimals)} {symbol}
    </FormDescription>
  );
};
