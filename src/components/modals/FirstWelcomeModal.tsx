import { FC } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import {
	P,
	H5,
	Button,
	Lead,
	neutralColors,
	brandColors,
} from '@giveth/ui-design-system';

import { Modal } from '@/components/modals/Modal';
import { ETheme, useGeneral } from '@/context/general.context';
import { IModal } from '@/types/common';

interface IText {
	isDark?: boolean;
}

export const FirstWelcomeModal: FC<IModal> = ({ setShowModal }) => {
	const { theme } = useGeneral();
	const router = useRouter();

	return (
		<Modal
			setShowModal={setShowModal}
			headerTitle={`Let's Gift`}
			headerTitlePosition='left'
		>
			<Container>
				<Title isDark={theme === ETheme.Dark}>
					{' '}
					Welcome to the future of gift economy
				</Title>
				<LeadTitle>Here is the things that you can do now!</LeadTitle>
				<Bullets>
					<li>
						<Paragraph isDark={theme === ETheme.Dark}>
							Take a look at awesome{' '}
							<InlineLink
								target='_blank'
								rel={'noopener noreferrer'}
								href={'/projects'}
							>
								{' '}
								projects
							</InlineLink>{' '}
							on Giftomy.
						</Paragraph>
					</li>
					<li>
						<Paragraph isDark={theme === ETheme.Dark}>
							You can also create a{' '}
							<InlineLink
								target='_blank'
								rel={'noopener noreferrer'}
								href={'/create'}
							>
								new project
							</InlineLink>{' '}
							and sell NFTs.
						</Paragraph>
					</li>

					<li>
						<Paragraph isDark={theme === ETheme.Dark}>
							You can{' '}
							<InlineLink
								target='_blank'
								rel={'noopener noreferrer'}
								href={'/'}
							>
								buy NFTs
							</InlineLink>
								{' '}to support public goods projects.
						</Paragraph>
					</li>
				</Bullets>
				<BrowserNFTButton
					label='Browser NFTs'
					onClick={() => {
						router.push('/');
						setShowModal(false);
					}}
					buttonType={theme === ETheme.Dark ? 'secondary' : 'primary'}
				/>
			</Container>
		</Modal>
	);
};

const InlineLink = styled.a`
	color: ${brandColors.pinky[500]};
	cursor: pointer;
`;

const Title = styled(H5)`
	color: ${(prop: IText) => (prop.isDark ? 'white' : brandColors.deep[900])};
	font-weight: 700;
	margin-bottom: 24px;
`;

const LeadTitle = styled(Lead)`
	margin-bottom: 24px;
`;

const BrowserNFTButton = styled(Button)`
	width: 300px;
	height: 48px;
	margin: 48px auto 0;
`;

const Container = styled.div`
	width: 528px;
	text-align: left;
	padding: 26px 33px;
`;

const Bullets = styled.ul`
	padding-left: 17px;
	list-style-image: url('/images/bullet_tiny.svg');
	display: flex;
	flex-direction: column;
	margin-bottom: 30px;
	li {
		margin: 8px 0;
		color: ${neutralColors.gray[900]};
	}
`;

const Paragraph = styled(P)`
	color: ${(prop: IText) => (prop.isDark ? 'white' : brandColors.deep[900])};
`;
