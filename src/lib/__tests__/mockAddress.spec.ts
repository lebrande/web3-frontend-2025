import { addressSchema } from '@/constants';
import { MOCK_ADDRESS } from '@/lib/utils';
import { expect, it } from 'vitest';

it('MOCK_ADDRESS', () => {
  const parsedAddress = addressSchema.parse(MOCK_ADDRESS);
  expect(parsedAddress).toBe(MOCK_ADDRESS);
});
