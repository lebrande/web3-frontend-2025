'use client';

import { VaultAddressForm } from '@/vaultAddressForm';
import { useRouter } from 'next/navigation';
import type { PropsWithChildren } from 'react';
import type { Address } from 'viem';

function App() {
  const router = useRouter();
  const onVaultAddressTyped = (address: Address) => {
    router.push(`/vault/${address}`);
  };

  return (
    <div>
      <section className="h-[40rem] flex justify-center items-center">
        <div className="max-w-2xl m-auto space-y-8 p-8">
          <h1 className="text-2xl font-bold">
            Access Any ERC-4626 Vault — Your Decentralized Interface for Yield
          </h1>
          <p>
            Easily interact with any ERC-4626 vault using our decentralized
            interface. Simply input the vault address to access deposit,
            withdrawal, and real-time statistics. No contracts or guarantees
            from us — we provide the tools, you bring the vault. Take control of
            your assets with full transparency.
          </p>
          <p>Just type the vault address here:</p>

          <VaultAddressForm onVaultAddressTyped={onVaultAddressTyped} />
        </div>
      </section>

      <Section>
        <Heading>A Simple Interface for Your ERC-4626 Vaults</Heading>
        <Paragraph>
          Our decentralized application offers a seamless, no-frills interface
          for interacting with any ERC-4626 yield-bearing vault. We don’t manage
          or provide vaults—this platform is designed to let you access and
          control the vaults you trust, all in one place.
        </Paragraph>
      </Section>

      <Section>
        <Heading>How It Works</Heading>
        <Paragraph>
          <strong>Step 1: Enter Vault Address</strong>
          <br /> Input the Ethereum address of any ERC-4626 vault. Our system
          instantly checks the address format and confirms the vault follows the
          ERC-4626 standard.
        </Paragraph>

        <Paragraph>
          <strong>Step 2: View Vault Interface</strong>
          <br /> Once validated, the vault’s interface appears, showing you all
          relevant statistics: total assets, token-to-share conversions, and
          current yield rates.
        </Paragraph>

        <Paragraph>
          <strong>Step 3: Manage Deposits and Withdrawals</strong>
          <br /> Deposit assets into the vault or withdraw them at any time,
          with real-time updates on share prices and available assets.
        </Paragraph>
      </Section>

      <Section>
        <Heading>Key Features</Heading>
        <Paragraph>
          <strong>Self-Managed Vault Access</strong>
          <br /> You provide the vault; we provide the interface. Our platform
          allows you to interact with any ERC-4626 vault on the Ethereum
          network, but we do not host or manage any smart contracts.
        </Paragraph>

        <Paragraph>
          <strong>Vault Address Validation</strong>
          <br /> When you input a vault address, we verify its format and ensure
          it conforms to the ERC-4626 standard. However, we do not guarantee the
          security or functionality of the vault—this depends entirely on the
          vault’s creator or operator.
        </Paragraph>

        <Paragraph>
          <strong>Real-Time Vault Data</strong>
          <br /> Stay informed with live statistics, including total vault
          assets, asset-to-share conversion rates, and performance metrics.
        </Paragraph>

        <Paragraph>
          <strong>Simple Deposit and Withdrawal Management</strong>
          <br /> Easily deposit into or withdraw from any ERC-4626 vault you
          trust. You maintain full control over your transactions and funds.
        </Paragraph>
      </Section>

      <Section>
        <Heading>Important Disclaimers</Heading>
        <Paragraph>
          <strong>We Do Not Provide Vaults or Smart Contracts</strong>
          <br /> Our application is purely an interface. We are not responsible
          for the security, management, or performance of the vaults you connect
          to. The vault’s smart contract is entirely controlled by its owner or
          creator.
        </Paragraph>

        <Paragraph>
          <strong>No Liability for Deposits</strong>
          <br /> Your deposits and withdrawals interact directly with the smart
          contract of the vault you choose. We take no responsibility for how
          the vault handles your funds. Always ensure you trust the vault you
          are depositing into.
        </Paragraph>

        <Paragraph>
          <strong>Decentralized, Trustless Interaction</strong>
          <br /> This interface provides a way for you to interact with ERC-4626
          vaults in a decentralized manner, with no central management from our
          side.
        </Paragraph>
      </Section>

      <Section>
        <Heading>Why Choose This Interface?</Heading>
        <Paragraph>
          <strong>Decentralized by Design</strong>
          <br /> Our application is a simple gateway for you to access and
          manage your vaults. We offer no central control, ensuring you have
          full autonomy.
        </Paragraph>

        <Paragraph>
          <strong>No Contractual Guarantees</strong>
          <br /> The responsibility for security and functionality lies entirely
          with the vault’s smart contract and its developers. Use only vaults
          you trust.
        </Paragraph>

        <Paragraph>
          <strong>User-Focused Interface</strong>
          <br /> We prioritize ease-of-use so that you can focus on managing
          your deposits and withdrawals without the hassle of navigating complex
          systems.
        </Paragraph>
      </Section>

      <Section>
        <Heading>Get Started</Heading>
        <Paragraph>
          Input your ERC-4626 vault address to access its interface. Manage your
          deposits, view live statistics, and withdraw whenever you choose—all
          through a clean, straightforward interface.
        </Paragraph>

        <VaultAddressForm onVaultAddressTyped={onVaultAddressTyped} />

        <Paragraph>
          <strong>Please note:</strong> We do not host or manage vaults. This
          application is solely an interface to interact with the smart
          contracts you provide.
        </Paragraph>
      </Section>

      <Section>
        <Heading>FAQ</Heading>
        <Paragraph>
          <strong>What is an ERC-4626 vault?</strong>
          <br /> ERC-4626 is a standard for yield-bearing vaults on Ethereum,
          simplifying how users interact with vaults that convert tokens into
          shares to represent deposited assets.
        </Paragraph>

        <Paragraph>
          <strong>What is our role?</strong>
          <br /> We only provide the interface for interacting with ERC-4626
          vaults. We do not control or manage any vaults or smart contracts. You
          are responsible for verifying and trusting the vault before
          depositing.
        </Paragraph>

        <Paragraph>
          <strong>
            What checks are performed when I enter a vault address?
          </strong>
          <br /> We verify the address format and check that the vault follows
          the ERC-4626 standard. However, we do not guarantee the security or
          functionality of the vault itself.
        </Paragraph>
      </Section>
    </div>
  );
}

const Section = ({ children }: PropsWithChildren) => {
  return (
    <section className="max-w-2xl m-auto space-y-8 p-8">{children}</section>
  );
};

const Heading = ({ children }: PropsWithChildren) => {
  return <h2 className="text-2xl font-bold">{children}</h2>;
};

const Paragraph = ({ children }: PropsWithChildren) => {
  return <p>{children}</p>;
};

export default App;
