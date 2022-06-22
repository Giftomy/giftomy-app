import { captureException } from '@sentry/nextjs';
import { networksParams } from '@/helpers/blockchain';


declare let window: any;

export async function addNetwork(network: number): Promise<void> {
	const { ethereum } = window;

	await ethereum.request({
		method: 'wallet_addEthereumChain',
		params: [{ ...networksParams[network] }],
	});
}

export async function switchNetwork(network: number): Promise<void> {
	const { ethereum } = window;
	const { chainId } = networksParams[network];

	try {
		await ethereum.request({
			method: 'wallet_switchEthereumChain',
			params: [{ chainId }],
		});
	} catch (switchError: any) {
		// This error code indicates that the chain has not been added to MetaMask.
		if (switchError.code === 4902) {
			addNetwork(network);
		}
		captureException(switchError, {
			tags: {
				section: 'switchNetwork',
			},
		});
	}
}
