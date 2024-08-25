import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AccountPosition } from "@/components/vault4626/AccountPosition";
import { VaultForm } from "@/components/vault4626/VaultForm";

export const Content = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Vault</CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        <VaultForm />
        <AccountPosition />
      </CardContent>
    </Card>
  );
};