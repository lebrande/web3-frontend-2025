import { Skeleton } from '@/components/ui/skeleton';
import { useVault4626 } from '@/vault4626/context';
import { formatUnits } from 'viem';

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
