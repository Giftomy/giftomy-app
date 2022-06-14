import { useMarketplace } from '@thirdweb-dev/react';
import React, { ReactElement } from 'react';
import { useContractMetadata } from '@3rdweb-sdk/react';
import { Providers } from 'components/app-layouts/providers';
import { ListButton } from 'components/contract-pages/action-buttons/ListButton';
import { ContractLayout } from 'components/contract-pages/contract-layout';
import { ContractItemsTable } from 'components/contract-pages/table';
import { useTrack } from 'hooks/analytics/useTrack';
import { useSingleQueryParam } from 'hooks/useQueryParam';

export default function MarketplacePage() {
	const marketAddress = useSingleQueryParam('marketplace');
	const contract = useMarketplace(marketAddress);
	const metadata = useContractMetadata(contract);

	const { Track } = useTrack({
		page: 'marketplace',
		marketplace: marketAddress,
	});

	return (
		<Track>
			<ContractLayout
				contract={contract}
				metadata={metadata}
				primaryAction={<ListButton contract={contract} />}
			>
				<ContractItemsTable
					contract={contract}
					emptyState={{
						title: 'You have not created any listings yet.',
					}}
				/>
			</ContractLayout>
		</Track>
	);
}

MarketplacePage.getLayout = (page: ReactElement) => (
	<Providers>{page}</Providers>
);