import { useMarketplace } from '@thirdweb-dev/react';
import { useEffect } from 'react';

export default function Component() {
	const marketplace = useMarketplace(
		'0xc4B0D95D6938E8c154d6637d6586e50B5ee1F44A',
	);

	useEffect(() => {
		const getListings = async () => {
			try {
				console.log('marketplace: ', marketplace);
				const listings = await marketplace?.getActiveListings({
					seller: '0x01AbECbEB70f67163a3aC8543E88d9C234A71Fa6',
					tokenContract: '0x720486Cd671E7bdc2935CfcDb2ee43CDBe70B7C5',
				});
				// const listings = await marketplace?.getAllListings();

				console.log('listings: ', listings);
				// const priceOfFirstActiveListing = listings[0].price;
			} catch (error) {
				console.log(error);
			}
		};
		getListings();
	}, []);
}
