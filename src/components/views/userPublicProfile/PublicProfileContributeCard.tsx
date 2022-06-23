import { Flex } from '../../styled-components/Flex';
import { IUserPublicProfileView } from '@/components/views/userPublicProfile/UserPublicProfile.view';
import { mediaQueries } from '@/lib/constants/constants';
import { formatUSD } from '@/lib/helpers';
import { brandColors, neutralColors, H2, H5, Subline } from '@giveth/ui-design-system';
import { FC } from 'react';
import styled from 'styled-components';


const PublicProfileContributeCard: FC<IUserPublicProfileView> = ({
	user,
	myAccount,
}) => {
	const userName = user?.name || 'Unknown';

	return (
		<>
			{!myAccount && (
				<UserContributeTitle
					weight={700}
				>{`${userName}’s NFTs & Projects`}</UserContributeTitle>
			)}

			{/* <ContributeCardContainer>
				<ContributeCard>
					<ContributeCardTitles>Projects</ContributeCardTitles>
					<ContributeCardTitles>
						NFT Sold
					</ContributeCardTitles>
					<H2>{user.projectsCount || 0}</H2>
					<H5>${formatUSD(user.totalReceived)}</H5>
				</ContributeCard>
			</ContributeCardContainer> */}
		</>
	);
};

const UserContributeTitle = styled(H5)`
	margin-bottom: 16px;
	margin-top: 40px;
`;

const ContributeCardContainer = styled(Flex)`
	gap: 32px;
	justify-content: space-between;
	flex-direction: column;
	align-items: center;
	${mediaQueries.tablet} {
		flex-direction: row;
	}
`;

const ContributeCard = styled.div`
  background: ${neutralColors.gray[900]};
  box-shadow: 0 3px 20px rgba(212, 218, 238, 0.4);
  border-radius: 12px;
  display: grid;
  padding: 24px;
  grid-template-columns: 1fr 1fr;
  width: 100%;
`;

const ContributeCardTitles = styled(Subline)`
	text-transform: uppercase;
`;

export default PublicProfileContributeCard;