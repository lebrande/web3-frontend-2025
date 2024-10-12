import { IncorrectVaultAddressAlert } from '@/components/IncorrectVaultAddressAlert';
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
import { useVaultData } from '@/ercx/useVaultData';
import { addressSchema } from '@/lib/address';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoaderCircleIcon, ScanSearchIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import type { Address } from 'viem';
import { useChainId } from 'wagmi';
import { z } from 'zod';

interface Props {
  onVaultAddressTyped: (address: Address) => void;
}

export const VaultAddressForm = ({ onVaultAddressTyped }: Props) => {
  const [selectedAddress, setSelectedAddress] = useState<Address>();

  const chainId = useChainId();

  const {
    data: vaultData,
    error,
    isFetching,
  } = useVaultData({
    chainId,
    vaultAddress: selectedAddress,
  });

  const isValidErc4626 = Boolean(vaultData) && !error;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      vaultAddress: '' as Address,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setSelectedAddress(values.vaultAddress);
  }

  useEffect(() => {
    if (form.formState.isValid) {
      form.handleSubmit(onSubmit)();
    }
  }, [form.formState.isValid]);

  useEffect(() => {
    if (selectedAddress && isValidErc4626) {
      onVaultAddressTyped(selectedAddress);
    }
  }, [isValidErc4626, selectedAddress]);

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
              <div className="grid md:grid-cols-8 gap-4">
                <div className="md:col-span-5">
                  <FormControl>
                    <Input
                      placeholder="0x"
                      {...field}
                      onChange={(event) => {
                        if (
                          selectedAddress &&
                          selectedAddress === field.value
                        ) {
                          setSelectedAddress(undefined);
                          form.clearErrors('vaultAddress');
                        }
                        return field.onChange(event);
                      }}
                      disabled={isFetching}
                    />
                  </FormControl>
                </div>
                <div className="md:col-span-3">
                  {isFetching ? (
                    <Button className="gap-2 w-full" type="button" disabled>
                      <LoaderCircleIcon className="animate-spin" /> Loading...
                    </Button>
                  ) : (
                    <Button className="gap-2 w-full" type="submit">
                      <ScanSearchIcon /> Check this address
                    </Button>
                  )}
                </div>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        {error && <IncorrectVaultAddressAlert />}
      </form>
    </Form>
  );
};

const formSchema = z.object({
  vaultAddress: addressSchema,
});
