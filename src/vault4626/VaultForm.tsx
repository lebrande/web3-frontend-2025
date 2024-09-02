import { Form } from '@/components/ui/form';
import { Allowance } from '@/vault4626/Allowance';
import { AmountInput } from '@/vault4626/AmountInput';
import { FormButtons } from '@/vault4626/FormButtons';
import { useVault4626 } from '@/vault4626/context';
import { useOnSubmit } from '@/vault4626/hooks';
import { useEffect } from 'react';

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
