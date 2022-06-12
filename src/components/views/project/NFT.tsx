import { useWeb3React } from "@web3-react/core";
import { useContractMetadata } from "@3rdweb-sdk/react";
import { ConnectWallet } from "@3rdweb-sdk/react";
import { useMarketplace } from "@thirdweb-dev/react";
import { Providers } from "components/app-layouts/providers";
import { ListButton } from "components/contract-pages/action-buttons/ListButton";
import { ContractLayout } from "components/contract-pages/contract-layout";
import { ContractItemsTable } from "components/contract-pages/table/marketplace";

export default function MarketplacePage({
  walletAddress,
}: {
  walletAddress: string;
}) {
  const marketAddress = process.env.NEXT_PUBLIC_MARKET_ADDRESS;
  const marketplace = useMarketplace(marketAddress);
  const metadata = useContractMetadata(marketplace);
  const { account } = useWeb3React();

  if (!account) return "Please connect to your wallet";

  const isProjectOwner = account.toLowerCase() === walletAddress.toLowerCase();

  const primaryAction = isProjectOwner && (
    <div>
      <ListButton contract={marketplace} />
      <ConnectWallet borderRadius="full" colorScheme="primary" />
    </div>
  );

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