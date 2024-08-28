import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { addressSchema } from '@/constants';
import { zodResolver } from '@hookform/resolvers/zod';
import { RotateCcwIcon } from 'lucide-react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import type { Address } from 'viem';
import { z } from 'zod';

interface Props {
  selectedAddress: Address | undefined;
  setSelectedAddress: (address: Address | undefined) => void;
}

export const VaultAddressForm = ({
  selectedAddress,
  setSelectedAddress,
}: Props) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      // @ts-expect-error
      vaultAddress: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setSelectedAddress(values.vaultAddress);
  }

  const isAddressSelected = Boolean(selectedAddress);

  const onReset = () => {
    setSelectedAddress(undefined);
    form.reset();
  };

  useEffect(() => {
    if (form.formState.isValid) {
      form.handleSubmit(onSubmit)();
    }
  }, [form.formState.isValid]);

  return (
    <Form {...form}>
      <form
        className="space-y-8"
        onBlur={form.handleSubmit(onSubmit)}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="vaultAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Vault address</FormLabel>
              {isAddressSelected && (
                <div className="flex gap-4">
                  <Input disabled value={selectedAddress} />
                  <Button className="gap-2" onClick={onReset}>
                    <RotateCcwIcon /> Check other address
                  </Button>
                </div>
              )}
              {!isAddressSelected && (
                <FormControl>
                  <Input placeholder="0x" {...field} />
                </FormControl>
              )}
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

const formSchema = z.object({
  vaultAddress: addressSchema,
});
