import type { Props } from '@/vault4626/Vault4626';
import { erc20Abi, erc4626Abi } from 'viem';
import { useAccount, useReadContract } from 'wagmi';

export const useParams = ({ chainId, vaultAddress }: Props) => {
  const { address: accountAddress } = useAccount();

  const { data: assetAddress } = useReadContract({
    address: vaultAddress,
    abi: erc4626Abi,
    functionName: 'asset',
    args: [],
    chainId,
  });

  const { data: decimals } = useReadContract({
    address: assetAddress,
    abi: erc20Abi,
    functionName: 'decimals',
    args: [],
    chainId,
  });

  const { data: symbol } = useReadContract({
    address: assetAddress,
    abi: erc20Abi,
    functionName: 'symbol',
    args: [],
    chainId,
  });

  const { data: balance } = useReadContract({
    address: assetAddress,
    abi: erc20Abi,
    functionName: 'balanceOf',
    // biome-ignore lint/style/noNonNullAssertion: query/enabled
    args: [accountAddress!],
    chainId,
    query: {
      enabled: Boolean(accountAddress),
    },
  });

  const { data: allowance } = useReadContract({
    address: assetAddress,
    abi: erc20Abi,
    functionName: 'allowance',
    // biome-ignore lint/style/noNonNullAssertion: query/enabled
    args: [accountAddress!, vaultAddress],
    chainId,
    query: {
      enabled: Boolean(accountAddress),
    },
  });

  const { data: shares } = useReadContract({
    address: vaultAddress,
    abi: erc4626Abi,
    functionName: 'balanceOf',
    // biome-ignore lint/style/noNonNullAssertion: query/enabled
    args: [accountAddress!],
    chainId,
    query: {
      enabled: Boolean(accountAddress),
    },
  });

  const { data: accountAssetsDeposited } = useReadContract({
    address: vaultAddress,
    abi: erc4626Abi,
    functionName: 'convertToAssets',
    // biome-ignore lint/style/noNonNullAssertion: query/enabled
    args: [shares!],
    chainId,
    query: {
      enabled: Boolean(accountAddress) && shares !== undefined,
    },
  });

  return {
    chainId,
    vaultAddress,
    accountAddress,
    assetAddress,
    decimals,
    symbol,
    balance,
    allowance,
    accountAssetsDeposited,
  };
};

export type Params = ReturnType<typeof useParams>;
