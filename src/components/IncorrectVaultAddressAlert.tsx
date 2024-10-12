import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { TerminalIcon } from 'lucide-react';

export const IncorrectVaultAddressAlert = () => {
  return (
    <Alert variant="destructive">
      <TerminalIcon className="h-4 w-4" />
      <AlertTitle>This is not a valid ERC-4626 vault address.</AlertTitle>
      <AlertDescription>
        We found an error while trying to fetch data from the vault. Please make
        sure you have entered a valid ERC-4626 vault address.
      </AlertDescription>
    </Alert>
  );
};
