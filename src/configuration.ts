import development from './config/development';
import production from './config/production';
import { GlobalConfig } from './types/config';

export const isProduction = process.env.NEXT_PUBLIC_ENV === 'production';

const envConfig = isProduction ? production : development;

const config: GlobalConfig = {
	TOKEN_NAME: 'DRGIV',
	WEB3_POLLING_INTERVAL: 15000,
	SUBGRAPH_POLLING_INTERVAL: 5000,
	TOKEN_PRECISION: 2,
	PRIMARY_NETWORK: {
		name: isProduction ? 'Ethereum Mainnet' : 'Ropsten',
		id: isProduction ? 1 : 3,
		chain: isProduction ? '0x1' : '0x3',
		mainToken: 'ETH',
	},
	SECONDARY_NETWORK: {
		name: 'Gnosis Chain',
		id: 100,
		chain: '0x64',
		mainToken: 'XDAI',
	},
	THIRD_NETWORK: {
		name: 'Polygon Testnet',
		id: 80001,
		chain: '80001',
		mainToken: 'MATIC',
	},
	...envConfig,
	NETWORKS_CONFIG: {
		[envConfig.MAINNET_NETWORK_NUMBER]: envConfig.MAINNET_CONFIG,
		[envConfig.POLYGON_TEST_NETWORK_NUMBER]:
			envConfig.POLYGON_TESTNET_CONFIG,
		[envConfig.POLYGON_MAIN_NETWORK_NUMBER]:
			envConfig.POLYGON_MAINNET_CONFIG,
	},
	// Used for adding networks to user wallet, useless since just xDAI is not
	// included in metamask by default and its rpc endpoint is not infura
	INFURA_API_KEY: process.env.NEXT_PUBLIC_INFURA_API_KEY,
	GOOGLE_MAPS_API_KEY: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
};

config.MAINNET_CONFIG.nodeUrl = process.env.NEXT_PUBLIC_NODE_URL || '';
config.POLYGON_MAINNET_CONFIG.nodeUrl = process.env.NEXT_PUBLIC_RPC_POLYGON || '';
config.POLYGON_TESTNET_CONFIG.nodeUrl = process.env.NEXT_PUBLIC_RPC_MUMBAI || '';

export default config;
