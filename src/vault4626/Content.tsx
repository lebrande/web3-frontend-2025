import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AccountPosition } from './components/AccountPosition';
import { ConfirmTx } from './components/ConfirmTx';
import { DepositTxSimulation } from './components/DepositTxSimulation';
import { TxError } from './components/TxError';
import { VaultForm } from './components/VaultForm';

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
