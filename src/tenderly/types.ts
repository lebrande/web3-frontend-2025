import type { ChainId } from '@/lib/types';
import type { Address, Hex } from 'viem';

export interface TxToSimulateData {
  account: Address;
  to: Address;
  data: Hex;
  chainId: ChainId;
}
