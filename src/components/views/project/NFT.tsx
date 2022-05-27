import { useContractMetadata } from '@3rdweb-sdk/react';
import { ConnectWallet } from '@3rdweb-sdk/react';
import { useMarketplace } from '@thirdweb-dev/react';
import { Providers } from 'components/app-layouts/providers';
import { ListButton } from 'components/contract-pages/action-buttons/ListButton';
import { ContractLayout } from 'components/contract-pages/contract-layout';
import { ContractItemsTable } from 'components/contract-pages/table';
import React from 'react';

export default function MarketplacePage() {
  // const marketAddress = useSingleQueryParam('marketplace');
  const marketAddress = '0xc4B0D95D6938E8c154d6637d6586e50B5ee1F44A';
  const contract = useMarketplace(marketAddress);
  const metadata = useContractMetadata(contract);

  return (
    <Providers>
      <ContractLayout
        contract={contract}
        metadata={metadata}
        primaryAction={<ListButton contract={contract} />}
      >
        <ConnectWallet borderRadius='full' colorScheme='primary' />
        <ContractItemsTable
          contract={contract}
          emptyState={{
            title: 'You have not created any listings yet.',
          }}
        />
      </ContractLayout>
    </Providers>
  );
}
