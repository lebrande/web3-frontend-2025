import { ercxApiClient } from '@/ercx/apiClient';
import type { ChainId } from '@/lib/types';
import { useQuery } from '@tanstack/react-query';
import type { Address } from 'viem';
import { z } from 'zod';

interface Args {
  chainId: ChainId;
  vaultAddress: Address | undefined;
}

export const useVaultData = ({ chainId, vaultAddress }: Args) => {
  const queryResult = useQuery({
    queryKey: ['useVaultData', vaultAddress, chainId],
    queryFn: async () => {
      if (vaultAddress === undefined) {
        throw new Error('vaultAddress is undefined');
      }

      const { data } = await ercxApiClient.get(
        `/api/v1/tokens/${chainId}/${vaultAddress}/report?standard=ERC4626`,
      );

      return vaultDataSchema.parse(data);
    },
    enabled: Boolean(vaultAddress),
    retry: false,
  });

  return queryResult;
};

const vaultDataSchema = z.object({
  standard: z.literal('ERC4626'),
  status: z.literal('DONE'),
});
