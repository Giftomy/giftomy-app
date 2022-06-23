import { FC } from 'react';
import styled from 'styled-components';
import { IconWalletApprove } from '@giveth/ui-design-system/lib/cjs/components/icons/WalletApprove';
import {
	brandColors,
	Button,
	Lead,
	neutralColors,
} from '@giveth/ui-design-system';
import { useWeb3React } from '@web3-react/core';

import { Modal } from '@/components/modals/Modal';
import useUser from '@/context/UserProvider';
import { ETheme, useGeneral } from '@/context/general.context';
import { mediaQueries } from '@/lib/constants/constants';
import useModal from '@/context/ModalProvider';
import { IModal } from '@/types/common';

interface IProps extends IModal {
	callback?: () => void;
}

export const SignWithWalletModal: FC<IProps> = ({ setShowModal, callback }) => {
	const { theme } = useGeneral();
	const {
		actions: { signToGetToken },
	} = useUser();
	const { account } = useWeb3React();
	const {
		actions: { showWelcomeModal },
	} = useModal();

	return (
		<Modal
			setShowModal={setShowModal}
			headerIcon={<IconWalletApprove />}
			headerTitle='Sign Wallet'
			headerTitlePosition='left'
		>
			<Container>
				<Description>
					You need to authorize your wallet to be able to use it on Giftomy.
				</Description>
				<NoteDescription color='red'>
					Note: This is necessary to be able to sell NFTs.
				</NoteDescription>
				<OkButton
					label='SIGN IN'
					onClick={async () => {
						if (!account) {
							return showWelcomeModal();
						}
						const signature = await signToGetToken();
						setShowModal(false);
						!!signature && callback && callback();
					}}
					buttonType={theme === ETheme.Dark ? 'secondary' : 'primary'}
				/>
				<SkipButton
					label='SKIP FOR NOW'
					onClick={() => setShowModal(false)}
					buttonType='texty'
				/>
			</Container>
		</Modal>
	);
};

const Container = styled.div`
	padding: 48px 24px;
	width: 100%;
	${mediaQueries.desktop} {
		width: 528px;
	}
	${mediaQueries.tablet} {
		width: 528px;
	}
`;

const OkButton = styled(Button)`
	width: 300px;
	margin: 48px auto 0;
`;

const SkipButton = styled(Button)`
	width: 300px;
	margin: 10px auto 0;
	:hover {
		background: transparent;
		color: ${brandColors.deep[200]};
	}
`;

const Description = styled(Lead)`
	margin-top: 24px;
`;

const NoteDescription = styled(Lead)`
	margin-top: 24px;
	color: ${neutralColors.gray[600]};
	font-size: 18px;
`;
