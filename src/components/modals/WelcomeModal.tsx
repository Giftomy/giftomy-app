import React, { FC } from 'react';
import { H3, P, brandColors, neutralColors, B } from '@giveth/ui-design-system';
import styled from 'styled-components';
import Image from 'next/image';
import { Shadow } from '@/components/styled-components/Shadow';
import ethIcon from '/public/images/tokens/eth.png';
import { mediaQueries } from '@/lib/constants/constants';
import useModal from '@/context/ModalProvider';
import { Modal } from './Modal';
import { IModal } from '@/types/common';

const WelcomeModal: FC<IModal> = ({ setShowModal }) => {
	const {
		actions: { showWalletModal },
	} = useModal();

	return (
		<>
			<Modal setShowModal={setShowModal} fullScreen hiddenHeader>
				<ModalGrid>
					<ContentContainer>
						<H3>Sign in to Giftomy</H3>
						<ContentSubtitle>
							Please sign in to your account and start using
							Giftomy.
						</ContentSubtitle>
						<IconContentContainer>
							<EthIconContainer onClick={showWalletModal}>
								<Image src={ethIcon} alt='Ether icon' />
								<B>Sign in with Ethereum</B>
							</EthIconContainer>
						</IconContentContainer>
					</ContentContainer>
				</ModalGrid>
			</Modal>
		</>
	);
};

const ModalGrid = styled.div`
	position: relative;
	display: flex;
	width: 100%;
	background: white !important;
	height: 100%;
`;

const ContentContainer = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	align-self: center;
	margin: auto;
	padding: 10px;
	${mediaQueries.laptop} {
		width: 45%;
	}
`;

const ContentSubtitle = styled(P)`
	color: ${brandColors.deep[800]};
	margin: 24px 0;
`;

const IconContentContainer = styled.div`
	width: 100%;
	max-width: 370px;
	display: flex;
	flex-direction: column;
`;

const IconsContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	justify-content: center;
	gap: 8px;
	padding: 3px 16px;
	border-radius: 8px;
	box-shadow: ${Shadow.Neutral[500]};
	cursor: pointer;
`;

const EthIconContainer = styled(IconsContainer)`
	padding: 20px 24px;
	border-radius: 4px;
`;

export default WelcomeModal;
