import { EnvConfig } from '@/types/config';
import { gwei2wei } from '@/helpers/blockchain';

const INFURA_API_KEY = process.env.NEXT_PUBLIC_INFURA_API_KEY;

const config: EnvConfig = {
	BACKEND_LINK: 'https://mainnet.serve.giveth.io/graphql',
	MAINNET_NETWORK_NUMBER: 1, // ETH
	XDAI_NETWORK_NUMBER: 100, // xDAI
	POLYGON_TEST_NETWORK_NUMBER: 137,
	POLYGON_MAIN_NETWORK_NUMBER: 80001,

	GARDEN_LINK:
		'https://gardens.1hive.org/#/xdai/garden/0xb25f0ee2d26461e2b5b3d3ddafe197a0da677b98',

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

	XDAI_CONFIG: {
		chainId: '0x64',
		chainName: 'Gnosis Chain',
		nativeCurrency: {
			name: 'XDAI',
			symbol: 'XDAI',
			decimals: 18,
		},

		gasPreference: {
			maxFeePerGas: gwei2wei('2'),
			maxPriorityFeePerGas: gwei2wei('1'),
		},

		blockExplorerName: ['Blockscout'],
		blockExplorerUrls: ['https://blockscout.com/xdai/mainnet'],
		nodeUrl: 'https://rpc.xdaichain.com/',
	},
};

export default config;
