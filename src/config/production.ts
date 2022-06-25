import { EnvConfig } from '@/types/config';
import { gwei2wei } from '@/helpers/blockchain';

const INFURA_API_KEY = process.env.NEXT_PUBLIC_INFURA_API_KEY;

const config: EnvConfig = {
	BACKEND_LINK: 'https://api.giftomy.xyz/graphql',
	MAINNET_NETWORK_NUMBER: 1, // ETH
	POLYGON_TEST_NETWORK_NUMBER: 137,
	POLYGON_MAIN_NETWORK_NUMBER: 80001,

	MAINNET_CONFIG: {
		chainId: '0x1', // A 0x-prefixed hexadecimal string
		chainName: 'Ethereum Mainnet',
		nativeCurrency: {
			name: 'ETH',
			symbol: 'ETH', // 2-6 characters long
			decimals: 18,
		},
		gasPreference: {
			// Keep it empty for automatic configuration
		},

		blockExplorerName: ['etherscan'],
		blockExplorerUrls: ['https://etherscan.io/'],
		nodeUrl: 'https://mainnet.infura.io/v3/' + INFURA_API_KEY,
	},
};

export default config;
