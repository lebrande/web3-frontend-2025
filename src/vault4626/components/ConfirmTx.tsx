import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { LoaderCircleIcon } from 'lucide-react';
import { useVault4626 } from '../context';

export const ConfirmTx = () => {
  const { form } = useVault4626();

  return (
    <Dialog open={form.formState.isSubmitting}>
      <DialogContent className="py-14" hideCloseButton>
        <DialogHeader className="items-center gap-8">
          <LoaderCircleIcon size={50} className="animate-spin" />
          <DialogTitle>Confirm in wallet</DialogTitle>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
