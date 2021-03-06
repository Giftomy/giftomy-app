import { useState } from 'react';
import styled from 'styled-components';
import {
	GLink,
	P,
	H6,
	brandColors,
	neutralColors,
	ButtonLink,
	B,
	Subline,
	IconVerified,
	semanticColors,
} from '@giveth/ui-design-system';
import Link from 'next/link';

import { Shadow } from '@/components/styled-components/Shadow';
import ProjectCardBadges from './ProjectCardLikeAndShareButtons';
import { IProject } from '@/apollo/types/types';
import { calcBiggestUnitDifferenceTime, htmlToText } from '@/lib/helpers';
import ProjectCardImage from './ProjectCardImage';
import {
	addressToUserView,
	slugToProjectView,
} from '@/lib/routeCreators';
import { Row } from '@/components/Grid';
import { mediaQueries } from '@/lib/constants/constants';
import { Flex } from '../styled-components/Flex';

const cardRadius = '12px';
const imgHeight = '226px';

interface IProjectCard {
	project: IProject;
}

const ProjectCard = (props: IProjectCard) => {
	const { project } = props;
	const {
		title,
		description,
		image,
		slug,
		adminUser,
		updatedAt,
		verified,
	} = project;

	const [isHover, setIsHover] = useState(false);

	const name = adminUser?.name;
	return (
		<Link href={slugToProjectView(slug)} passHref>
			<Wrapper
				onMouseEnter={() => setIsHover(true)}
				onMouseLeave={() => setIsHover(false)}
			>
				<ImagePlaceholder>
					<ProjectCardBadges project={project} />
					<ProjectCardImage image={image} />
				</ImagePlaceholder>
				<CardBody
					isHover={isHover}
				>
					<div style={{ position: 'relative' }}>
						<LastUpdatedContainer isHover={isHover}>
							Last updated:
							{calcBiggestUnitDifferenceTime(updatedAt)}
						</LastUpdatedContainer>

						<a href={slugToProjectView(slug)}>
							<Title weight={700} isHover={isHover}>
								{title}
							</Title>
						</a>
					</div>
					{adminUser ? (
						<Link
							href={addressToUserView(adminUser?.walletAddress)}
							passHref
						>
							<Author size='Big'>{name || '\u200C'}</Author>
						</Link>
					) : (
						<Author size='Big'>
							<br />
						</Author>
					)}
					<Description>{htmlToText(description)}</Description>
					<BadgesContainer gap='16px'>
						{verified && (
							<>
								<Flex alignItems='center' gap='4px'>
									<IconVerified
										size={16}
										color={semanticColors.jade[500]}
									/>
									<VerifiedText>VERIFIED</VerifiedText>
								</Flex>
							</>
						)}
					</BadgesContainer>
					<ActionButtons>
						<Link href={slugToProjectView(slug)} passHref>
							<CustomizedStyledButton
								linkType='primary'
								size='small'
								label='View'
							/>
						</Link>
					</ActionButtons>
				</CardBody>
			</Wrapper>
		</Link>
	);
};

const StyledButton = styled(ButtonLink)`
	flex: 1;
`;

const CustomizedStyledButton = styled(StyledButton)`
	margin: 25px 0;
	${mediaQueries.desktop} {
		margin: 25px 12px;
	}
`;

const VerifiedText = styled(Subline)`
	color: ${semanticColors.jade[500]};
`;

const BadgesContainer = styled(Flex)`
	min-height: 25px;
`;

const LastUpdatedContainer = styled(Subline)<{ isHover?: boolean }>`
	position: absolute;
	bottom: 20px;
	background-color: ${neutralColors.gray[300]};
	color: ${neutralColors.gray[700]};
	padding: 2px 8px;
	border-radius: 4px;
	${mediaQueries.laptop} {
		transition: opacity 0.3s ease-in-out;
		display: inline;
		opacity: ${props => (props.isHover ? 1 : 0)};
		bottom: 30px;
	}
`;

const ActionButtons = styled(Row)`
	gap: 16px;
`;

const Hr = styled.hr`
	border: 1px solid ${neutralColors.gray[300]};
`;

const Description = styled(P)`
	height: 75px;
	overflow: hidden;
	color: ${neutralColors.gray[800]};
	margin-bottom: 16px;
`;

const CardBody = styled.div<{
	isHover?: boolean;
}>`
	padding: 26px;
	padding-top: 32px;
	position: absolute;
	left: 0;
	right: 0;
	top: 200px;
	background-color: ${neutralColors.gray[100]};
	transition: top 0.3s ease;
	border-radius: 12px;
	${mediaQueries.desktop} {
		top: ${props => (props.isHover ? '130px' : '200px')};
	}
`;

const Author = styled(GLink)`
	color: ${brandColors.pinky[500]};
	margin-bottom: 16px;
	display: block;
`;

const Title = styled(H6)<{ isHover?: boolean }>`
	color: ${props =>
		props.isHover ? brandColors.pinky[500] : brandColors.deep[700]};
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
	margin-bottom: 2px;
`;

const ImagePlaceholder = styled.div`
	height: ${imgHeight};
	width: 100%;
	position: relative;
	overflow: hidden;
`;

const Wrapper = styled.div`
	position: relative;
	width: 100%;
	border-radius: ${cardRadius};
	background: white;
	overflow: hidden;
	box-shadow: ${Shadow.Neutral[400]};
	height: 536px;
	cursor: pointer;
	${mediaQueries.desktop} {
		height: 472px;
	}
`;

export default ProjectCard;
