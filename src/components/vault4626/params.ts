import { erc20Abi, erc4626Abi } from "viem";
import { arbitrum } from "viem/chains";
import { useAccount, useReadContract } from "wagmi";

const VAULT_ADDRESS = import.meta.env.VITE_VAULT_ADDRESS;

export const useParams = () => {
  const { address: accountAddress } = useAccount();

  const { data: assetAddress } = useReadContract({
    address: VAULT_ADDRESS,
    abi: erc4626Abi,
    functionName: 'asset',
    args: [],
    chainId: arbitrum.id,
  });

  const { data: decimals } = useReadContract({
    address: assetAddress,
    abi: erc20Abi,
    functionName: 'decimals',
    args: [],
    chainId: arbitrum.id,
  });

  const { data: symbol } = useReadContract({
    address: assetAddress,
    abi: erc20Abi,
    functionName: 'symbol',
    args: [],
    chainId: arbitrum.id,
  });

  const { data: balance } = useReadContract({
    address: assetAddress,
    abi: erc20Abi,
    functionName: 'balanceOf',
    args: [accountAddress!],
    chainId: arbitrum.id,
    query: {
      enabled: Boolean(accountAddress),
    }
  });

  const { data: allowance } = useReadContract({
    address: assetAddress,
    abi: erc20Abi,
    functionName: 'allowance',
    args: [accountAddress!, VAULT_ADDRESS],
    chainId: arbitrum.id,
    query: {
      enabled: Boolean(accountAddress),
    }
  });

  return {
    assetAddress,
    decimals,
    symbol,
    balance,
    allowance,
  };
}

export type Params = ReturnType<typeof useParams>;