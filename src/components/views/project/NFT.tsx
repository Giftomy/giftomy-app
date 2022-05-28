import { useContractMetadata } from "@3rdweb-sdk/react";
import { ConnectWallet } from "@3rdweb-sdk/react";
import { useMarketplace } from "@thirdweb-dev/react";
import { Providers } from "components/app-layouts/providers";
import { ListButton } from "components/contract-pages/action-buttons/ListButton";
import { ContractLayout } from "components/contract-pages/contract-layout";
import { ContractItemsTable } from "components/contract-pages/table/marketplace";
import React from "react";
import { useEffect } from "react";


export default function MarketplacePage({
  walletAddress,
}: {
  walletAddress: string;
}) {
  const marketAddress = process.env.NEXT_PUBLIC_MARKET_ADDRESS;
  const contract = useMarketplace(marketAddress);
  const metadata = useContractMetadata(contract);
  const marketplace = useMarketplace(marketAddress);

  useEffect(() => {
    const getListings = async () => {
      try {
        console.log("walletAddress: ", walletAddress);
        const listings = await marketplace?.getActiveListings({
          seller: walletAddress,
        });
        // const listings = await marketplace?.getAllListings();

        console.log("listings: ", listings);
        // const priceOfFirstActiveListing = listings[0].price;
      } catch (error) {
        console.log(error);
      }
    };
    getListings();
  }, []);
  return (
    <Providers>
      <ContractLayout
        contract={contract}
        metadata={metadata}
        primaryAction={<ListButton contract={contract} />}
      >
        <ConnectWallet borderRadius="full" colorScheme="primary" />
        <ContractItemsTable
          contract={contract}
          emptyState={{
            title: "You have not created any listings yet.",
          }}
        />
      </ContractLayout>
    </Providers>
  );
}