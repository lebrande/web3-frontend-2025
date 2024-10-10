import { tenderlyApiClient } from '@/tenderly/apiClient';
import type { TxToSimulateData } from '@/tenderly/types';
import { useQuery } from '@tanstack/react-query';
import { useConfig } from 'wagmi';
import { prepareTransactionRequest } from 'wagmi/actions';
import { z } from 'zod';

const ACCOUNT_SLUG = process.env.NEXT_PUBLIC_TENDERLY_ACCOUNT_SLUG as unknown;
const PROJECT_SLUG = process.env.NEXT_PUBLIC_TENDERLY_PROJECT_SLUG as unknown;

export const useSimulateTx = (txToSimulateData: TxToSimulateData) => {
  const config = useConfig();

  const queryResult = useQuery({
    queryKey: ['useSimulateTx', txToSimulateData],
    queryFn: async () => {
      if (typeof ACCOUNT_SLUG !== 'string') {
        throw new Error('ACCOUNT_SLUG is not a string');
      }
      if (typeof PROJECT_SLUG !== 'string') {
        throw new Error('PROJECT_SLUG is not a string');
      }
      if (config === undefined) {
        throw new Error('config is undefined');
      }

      const { data: prepareData } = await prepareTransactionRequest(
        config,
        txToSimulateData,
      );

      const { data } = await tenderlyApiClient.post(
        `/v1/account/${ACCOUNT_SLUG}/project/${PROJECT_SLUG}/simulate`,
        {
          network_id: txToSimulateData.chainId.toString(),
          to: txToSimulateData.to,
          from: txToSimulateData.account,
          input: prepareData,
          gas: 8000000,
          gas_price: '0',
          value: 0,
          save_if_fails: true,
        },
      );

      return simulationResultSchema.parse(data);
    },
    retry: false,
  });

  return queryResult;
};

const simulationResultSchema = z.object({
  transaction: z.object({
    transaction_info: z.object({
      block_number: z.number(),
      asset_changes: z.array(
        z.object({
          type: z.string(),
        }),
      ),
    }),
  }),
});
