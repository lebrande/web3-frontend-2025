import { Form } from '@/components/ui/form';
import { useEffect } from 'react';
import { useVault4626 } from '../context';
import { useOnSubmit } from '../contextHooks';
import { Allowance } from './Allowance';
import { AmountInput } from './AmountInput';
import { FormButtons } from './FormButtons';

export const VaultForm = () => {
  const {
    form,
    params: { decimals, balance, accountAddress },
  } = useVault4626();
  const onSubmit = useOnSubmit();

  useEffect(() => {
    if (balance !== undefined) {
      form.setValue('balance', balance);
    }
  }, [balance]);

  useEffect(() => {
    if (decimals !== undefined) {
      form.setValue('decimals', decimals);
    }
  }, [decimals]);

  useEffect(() => {
    if (accountAddress !== undefined) {
      form.setValue('accountAddress', accountAddress);
    }
  }, [accountAddress]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <AmountInput />
        <div className="space-y-2">
          <div className="flex gap-4">
            <FormButtons />
          </div>
          <Allowance />
        </div>
      </form>
    </Form>
  );
};
