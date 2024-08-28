import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { PropsWithChildren } from 'react';
import { Link } from 'react-router-dom';

export const Navbar = () => {
  return (
    <div className="flex justify-between items-center py-3 px-4">
      <div className="flex items-center gap-8">
        <Link to="/" className="text-2xl font-bold">
          Web3 Frontend 2025
        </Link>
        <ul className="flex items-center gap-4">
          <MenuItem>
            <Link to="/vault4626">Vault ERC4626</Link>
          </MenuItem>
        </ul>
      </div>
      <ConnectButton
        showBalance={true}
        chainStatus={{
          smallScreen: 'full',
          largeScreen: 'full',
        }}
        accountStatus={{
          smallScreen: 'avatar',
          largeScreen: 'full',
        }}
      />
    </div>
  );
};

const MenuItem = (props: PropsWithChildren) => {
  return (
    <li className="text-muted-foreground text-sm hover:text-foreground">
      {props.children}
    </li>
  );
};
