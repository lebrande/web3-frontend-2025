import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AccountPosition } from '@/vault4626/AccountPosition';
import { ConfirmTx } from '@/vault4626/ConfirmTx';
import { DepositTxSimulation } from '@/vault4626/DepositTxSimulation';
import { TxError } from '@/vault4626/TxError';
import { VaultForm } from '@/vault4626/VaultForm';

export const Content = () => {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Vault</CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          <VaultForm />
          <AccountPosition />
          <DepositTxSimulation />
        </CardContent>
      </Card>
      <ConfirmTx />
      <TxError />
    </>
  );
};
