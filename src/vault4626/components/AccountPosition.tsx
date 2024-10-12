import { Skeleton } from '@/components/ui/skeleton';
import { formatUnits } from 'viem';
import { useVault4626 } from '../context';

export const AccountPosition = () => {
  const {
    params: { accountAddress, accountAssetsDeposited, decimals, symbol },
  } = useVault4626();

  if (!accountAddress) {
    return null;
  }

  if (accountAssetsDeposited === undefined || decimals === undefined) {
    return <Skeleton className="h-[56px]" />;
  }

  return (
    <div className="bg-secondary text-secondary-foreground p-4 rounded-xl flex justify-between items-center">
      <p>Your account position:</p>
      <p>
        {formatUnits(accountAssetsDeposited, decimals)} {symbol}
      </p>
    </div>
  );
};
