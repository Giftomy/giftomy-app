export interface GasPreference {
	maxFeePerGas?: string;
	maxPriorityFeePerGas?: string;
}

export interface BasicNetworkConfig {
	nodeUrl: string;
	chainId: string; // A 0x-prefixed hexadecimal string
	chainName: string;
	nativeCurrency: {
		name: string;
		symbol: string; // 2-6 characters long
		decimals: number;
	};
	blockExplorerUrls?: string[];
	iconUrls?: string[]; // Currently ignored.
	blockExplorerName: string[];
	gasPreference: GasPreference;
}

interface MainnetNetworkConfig extends BasicNetworkConfig {
	WETH_TOKEN_ADDRESS: string;
}
interface XDaiNetworkConfig extends BasicNetworkConfig {
	MERKLE_ADDRESS: string;
}
interface PolygonMainnetNetworkConfig extends BasicNetworkConfig {
	WETH_TOKEN_ADDRESS: string;
}
interface PolygonTestnetNetworkConfig extends BasicNetworkConfig {
	WETH_TOKEN_ADDRESS: string;
}

export interface EnvConfig {
	MAINNET_NETWORK_NUMBER: number;
	XDAI_NETWORK_NUMBER: number;
	POLYGON_TEST_NETWORK_NUMBER: number;
	POLYGON_MAIN_NETWORK_NUMBER: number;
	MAINNET_CONFIG: MainnetNetworkConfig;
	XDAI_CONFIG: XDaiNetworkConfig;
	POLYGON_TESTNET_CONFIG: PolygonMainnetNetworkConfig;
	POLYGON_MAINNET_CONFIG: PolygonTestnetNetworkConfig;
	GARDEN_LINK: string;
	BACKEND_LINK: string;
}

export interface GlobalConfig extends EnvConfig {
	TOKEN_NAME: string;
	WEB3_POLLING_INTERVAL: number;
	SUBGRAPH_POLLING_INTERVAL: number;
	TOKEN_PRECISION: number;
	PRIMARY_NETWORK: any;
	SECONDARY_NETWORK: any;
	THIRD_NETWORK: any;
	NETWORKS_CONFIG: {
		[key: number]: MainnetNetworkConfig | XDaiNetworkConfig | PolygonMainnetNetworkConfig | PolygonTestnetNetworkConfig;
	};
	INFURA_API_KEY: string | undefined;
	BLOCKNATIVE_DAPP_ID: string | undefined;
	GOOGLE_MAPS_API_KEY: string | undefined;
}
