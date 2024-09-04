import { Skeleton } from '@/components/ui/skeleton';
import type { TxToSimulateData } from '@/tenderly/types';
import { useSimulateTx } from '@/tenderly/useSimulateTx';

interface Props {
  txToSimulateData: TxToSimulateData;
}

export const Simulation = ({ txToSimulateData }: Props) => {
  const { data, error } = useSimulateTx(txToSimulateData);

  if (error) {
    return (
      <div className="overflow-x-auto rounded-lg border border-border p-2 bg-muted text-muted-foreground">
        <pre>
          <code>{JSON.stringify(error, null, 2)}</code>
        </pre>
      </div>
    );
  }

  if (data === undefined) {
    return <Skeleton className="h-20" />;
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-border p-2 bg-muted text-muted-foreground">
      <pre>
        <code>{JSON.stringify(data, null, 2)}</code>
      </pre>
    </div>
  );
};
