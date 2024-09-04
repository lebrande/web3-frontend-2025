import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Simulation } from '@/simulation/Simulation';
import { useVault4626 } from '@/vault4626/context';
import { useEncodeTxToSimulate } from '@/vault4626/hooks';

export const DepositTxSimulation = () => {
  const {
    params: { txToSimulate, setTxToSimulate },
  } = useVault4626();
  const encodeTxToSimulate = useEncodeTxToSimulate();

  return (
    <Dialog
      open={txToSimulate !== undefined}
      onOpenChange={(isOpen) => {
        if (isOpen) {
          encodeTxToSimulate();
          return;
        }
        setTxToSimulate(undefined);
      }}
    >
      <DialogTrigger asChild>
        <Button>Open tx simulation</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Transaction simulation</DialogTitle>
        </DialogHeader>
        {txToSimulate && <Simulation txToSimulateData={txToSimulate} />}
      </DialogContent>
    </Dialog>
  );
};
