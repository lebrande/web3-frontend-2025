import { Address, isAddress } from "viem";
import { z } from "zod";

export const NUMBER_REGEX = /^-?[0-9]+(\.[0-9]+)?$/;

export const addressSchema = z.custom<Address>((address) =>
  isAddress(address, { strict: false }),
);