import { Button } from '@/components/ui/button';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useVault4626 } from '../context';
import { useNeedsApproval } from '../contextHooks';

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
