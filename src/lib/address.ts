import { type Address, isAddress } from 'viem';
import { z } from 'zod';

/**
 * The address of EVM account or smart contract
 * @example '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48'
 */
export const addressSchema = z.custom<Address>(
  (address) => isAddress(address, { strict: false }),
  {
    message: 'Incorrect address',
  },
);
