import { ethers } from 'ethers';

import { captureException } from '@sentry/nextjs';
import { IUser } from '@/apollo/types/types';
import { initializeApollo } from '@/apollo/apolloClient';
import { LOGIN_USER } from '@/apollo/gql/gqlAuth';
import { showToastError } from '@/lib/helpers';

const apolloClient = initializeApollo();

export async function getToken(
	walletAddress: string | null | undefined,
	signature: string,
	networkId: number | undefined,
	user?: IUser,
) {
	if (signature && walletAddress && networkId) {
		try {
			const mutate = {
				mutation: LOGIN_USER,
				variables: {
					walletAddress: ethers.utils.getAddress(walletAddress),
					signature,
					email: user?.email,
					avatar: user?.avatar,
					name: user?.name,
					hostname: window?.location.hostname,
					networkId,
				},
			};
			const { data } = await apolloClient.mutate(mutate);
			return data?.loginWallet?.token;
		} catch (error) {
			showToastError(error);
			captureException(error, {
				tags: {
					section: 'getToken',
				},
			});
		}
	} else {
		showToastError('Input data for getting token is incomplete');
	}
}
