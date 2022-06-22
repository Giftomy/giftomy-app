import { useRouter } from 'next/router';
import { H1, brandColors, Button, Lead } from '@giveth/ui-design-system';
import styled from 'styled-components';

import { FlexCenter } from '@/components/styled-components/Flex';
import Routes from '@/lib/constants/Routes';
import { Arc } from '@/components/styled-components/Arc';
import useUser from '@/context/UserProvider';
import { isUserRegistered } from '@/lib/helpers';
import { mediaQueries } from '@/lib/constants/constants';
import useModal from '@/context/ModalProvider';

const HomeHeader = () => {
	const router = useRouter();
	const {
		state: { user },
	} = useUser();

	const {
		actions: { showCompleteProfile },
	} = useModal();

	const handleCreateButton = () => {
		if (isUserRegistered(user)) {
			router.push(Routes.CreateProject);
		} else {
			showCompleteProfile();
		}
	};

	return (
		<Wrapper>
			<Title weight={700}>Build with public goods, for public goods</Title>
			<Subtitle>
				Giftomy is a NFT marketplace for public goods, which include open source software, open science, open education, open data and so on. We help public goods creators to value their work and connect with their supporters. Finally it will unleash unlimited creativity.
			</Subtitle>
			<AllProjectsButton
				buttonType='primary'
				size='large'
				label='SEE PROJECTS'
				onClick={() => router.push(Routes.Projects)}
			/>
			<CreateProject
				buttonType='texty'
				size='large'
				label='Create a Project'
				onClick={handleCreateButton}
			/>
			{/* <MustardArc /> */}
		</Wrapper>
	);
};

const Title = styled(H1)`
	margin-bottom: 0.5rem;
	padding-top: 3rem;
`;

const Subtitle = styled(Lead)`
	margin: 23px 0;
	padding-bottom: 30px;
`;

const AllProjectsButton = styled(Button)`
	height: 66px;
	padding: 0 80px;
`;

const CreateProject = styled(Button)`
	height: 66px;
	color: ${brandColors.mustard[500]};
	a {
		font-weight: 400;
	}

	&:hover {
		background-color: transparent;
		color: ${brandColors.mustard[500]};
	}
`;

const MustardArc = styled(Arc)`
	border-width: 60px;
	border-color: ${brandColors.mustard[500]};
	top: 150px;
	left: -250px;
	width: 360px;
	height: 360px;
	display: none;

	${mediaQueries.tablet} {
		display: unset;
	}
`;

const Wrapper = styled(FlexCenter)`
	height: 650px;
	text-align: center;
	background: ${brandColors.giv[500]};
	color: white;
	flex-direction: column;
	position: relative;
`;

export default HomeHeader;
