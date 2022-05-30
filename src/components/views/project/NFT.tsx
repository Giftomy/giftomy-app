import { useContractMetadata } from "@3rdweb-sdk/react";
import { ConnectWallet } from "@3rdweb-sdk/react";
import { useMarketplace } from "@thirdweb-dev/react";
import { useWeb3React } from '@web3-react/core';
import { Providers } from "components/app-layouts/providers";
import { ListButton } from "components/contract-pages/action-buttons/ListButton";
import { ContractLayout } from "components/contract-pages/contract-layout";
import { ContractItemsTable } from "components/contract-pages/table/marketplace";
import React from 'react';
import { useEffect } from 'react';


export default function MarketplacePage({
  walletAddress,
}: {
  walletAddress: string;
}) {
  const marketAddress = process.env.NEXT_PUBLIC_MARKET_ADDRESS;
  const marketplace = useMarketplace(marketAddress);
  const metadata = useContractMetadata(marketplace);
  const { chainId, active, account, library } = useWeb3React();
  const isProjectOwner = account.toLowerCase() === walletAddress.toLowerCase();
  console.log(' isProjectOwner', isProjectOwner);
  const primaryAction = isProjectOwner && (
    <div>
      <ListButton contract={marketplace} />
      <ConnectWallet borderRadius='full' colorScheme='primary' />
    </div>
  );
  // const conectWallet = isprojectOwner && (
  // );
  return (
    <Providers>
      <ContractLayout
        contract={marketplace}
        metadata={metadata}
        primaryAction={primaryAction}
      >
        {/* {conectWallet} */}
        <ContractItemsTable
          contract={marketplace}
          walletAddress={walletAddress}
          emptyState={{
            title: "You have not created any listings yet.",
          }}
        />
      </ContractLayout>
    </Providers>
  );
}