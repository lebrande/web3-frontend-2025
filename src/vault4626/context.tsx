import { type ReactNode, createContext, useContext } from 'react';
import type { Actions } from './actions';
import type { TxForm } from './form';
import type { Params } from './params';

const Context = createContext<Args | null>(null);

interface Args {
  actions: Actions;
  params: Params;
  form: TxForm;
}

interface Props extends Args {
  children: ReactNode;
}

export const Vault4626Provider = ({ children, ...args }: Props) => {
  return <Context.Provider value={args}>{children}</Context.Provider>;
};

export const useVault4626 = () => {
  const context = useContext(Context);

  if (!context) {
    throw new Error('useVault4626 must be used inside Vault4626Provider');
  }

  return context;
};
