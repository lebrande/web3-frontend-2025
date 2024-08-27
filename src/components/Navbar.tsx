import { ConnectButton } from "@rainbow-me/rainbowkit";

export const Navbar = () => {
  return (
    <div className="flex justify-between items-center py-3 px-4">
      <h1 className="text-2xl font-bold">Web3 Frontend 2025</h1>
      <ConnectButton
        showBalance={true}
        chainStatus={{
          smallScreen: 'full',
          largeScreen: 'full',
        }}
        accountStatus={{
          smallScreen: 'avatar',
          largeScreen: 'full'
        }}
      />
    </div>
  );
};