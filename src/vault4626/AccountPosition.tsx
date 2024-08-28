import { Skeleton } from "@/components/ui/skeleton";
import { useVault4626 } from "@/vault4626/context";
import { formatUnits } from "viem";

export const AccountPosition = () => {
  const { params } = useVault4626();
  const {
    accountAssets,
    decimals,
    symbol,
  } = params;

  if (accountAssets === undefined || decimals === undefined) {
    return (
      <Skeleton className="h-[56px]" />
    );
  }

  return (
    <div className="bg-secondary text-secondary-foreground p-4 rounded-xl flex justify-between items-center">
      <p>Your account position:</p>
      <p>{formatUnits(accountAssets, decimals)} {symbol}</p>
    </div>
  );
};