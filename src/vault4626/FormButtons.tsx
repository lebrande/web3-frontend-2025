import { Button } from '@/components/ui/button';
import { useVault4626 } from '@/vault4626/context';
import { useNeedsApproval } from '@/vault4626/hooks';
import { ConnectButton } from '@rainbow-me/rainbowkit';

export const FormButtons = () => {
  const {
    params: { accountAddress },
    form,
  } = useVault4626();
  const needsApproval = useNeedsApproval();

  if (accountAddress) {
    const isSubmitDisabled = form.formState.isDirty && !form.formState.isValid;

    return (
      <>
        <Button type="submit" disabled={!needsApproval || isSubmitDisabled}>
          {needsApproval ? 'Approve' : 'Approved'}
        </Button>
        <Button type="submit" disabled={needsApproval || isSubmitDisabled}>
          Deposit
        </Button>
      </>
    );
  }

  return <ConnectButton />;
};
