import { EnvConfig } from '@/types/config';
import { gwei2wei } from '@/helpers/blockchain';

const INFURA_API_KEY = process.env.NEXT_PUBLIC_INFURA_API_KEY;

const MAINNET_CONFIG = {
	chainId: '0x2a', // A 0x-prefixed hexadecimal string
	chainName: 'Kovan',
	nativeCurrency: {
		name: 'ETH',
		symbol: 'ETH', // 2-6 characters long
		decimals: 18,
	},

	gasPreference: {
		// Keep it empty for automatic configuration
	},
	blockExplorerName: ['Etherscan'],
	blockExplorerUrls: ['https://kovan.etherscan.io'],

	nodeUrl: 'https://kovan.infura.io/v3/' + INFURA_API_KEY,
};

const POLYGON_TESTNET_CONFIG = {
	chainId: '0x13881', // A 0x-prefixed hexadecimal string
	chainName: 'Polygon Testnet',
	nativeCurrency: {
		name: 'Matic',
		symbol: 'MATIC', // 2-6 characters long
		decimals: 18,
	},

	gasPreference: {
		// Keep it empty for automatic configuration
	},
	blockExplorerName: ['polygonscan'],
	blockExplorerUrls: ['https://mumbai.polygonscan.com/'],
	nodeUrl: 'https://polygon-mumbai.infura.io/v3/' + INFURA_API_KEY,

};

const config: EnvConfig = {
	BACKEND_LINK: 'http://localhost:4000/graphql',
	MAINNET_NETWORK_NUMBER: 42, // Kovan
	XDAI_NETWORK_NUMBER: 100, // xDAI
	POLYGON_TEST_NETWORK_NUMBER: 137,
	POLYGON_MAIN_NETWORK_NUMBER: 80001,

	GARDEN_LINK:
		'https://gardens-staging.1hive.org/#/xdai/garden/0x16388d99199a74810fc572049b3d4d657e7d5deb',

	MAINNET_CONFIG,
	POLYGON_TESTNET_CONFIG,
	POLYGON_MAINNET_CONFIG: POLYGON_TESTNET_CONFIG,
};

export default config;
