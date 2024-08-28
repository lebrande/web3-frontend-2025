import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useVault4626 } from "@/vault4626/context";
import { CircleXIcon } from "lucide-react";
import { BaseError } from "viem";

export const TxError = () => {
  const {
    actions: { error, reset },
  } = useVault4626();

  const title = error instanceof BaseError
    ? error.shortMessage
    : 'Error';

  return (
    <Dialog
      open={Boolean(error)}
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          reset();
        }
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CircleXIcon className="text-destructive" />
            {title}
          </DialogTitle>
        </DialogHeader>
        <div 
        className="overflow-x-auto rounded-lg border border-border p-2 bg-muted text-muted-foreground"
        >
          <pre>
            <code>{error?.message}</code>
          </pre>
        </div>
        <DialogFooter>
          <Button onClick={reset}>
            Dismiss
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};