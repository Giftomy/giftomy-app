import { ConnectWallet } from "@3rdweb-sdk/react";
import { useMarketplace } from "@thirdweb-dev/react";
import { Providers } from "components/app-layouts/providers";
import { ListButton } from "components/contract-pages/action-buttons/ListButton";
import { ContractLayout } from "components/contract-pages/contract-layout";
import { ContractItemsTable } from "components/contract-pages/table";
import React from "react";


export default function Listings() {
  const marketAddress = process.env.NEXT_PUBLIC_MARKET_ADDRESS;
  const contract = useMarketplace(marketAddress);
  return (
    <Providers>
      <ContractItemsTable
        contract={contract}
        emptyState={{
          title: "You have not created any listings yet.",
        }}
      />
    </Providers>
  );
}