import { FormDescription } from '@/components/ui/form';
import { Skeleton } from '@/components/ui/skeleton';
import { formatUnits } from 'viem';
import { useVault4626 } from '../context';

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
