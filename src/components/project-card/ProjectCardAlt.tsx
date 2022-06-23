import ProjectCardImage from './ProjectCardImage';
import { IProject } from '@/apollo/types/types';
import InternalLink from '@/components/InternalLink';
import VerificationBadge from '@/components/badges/VerificationBadge';
import { Shadow } from '@/components/styled-components/Shadow';
import { mediaQueries } from '@/lib/constants/constants';
import { htmlToText } from '@/lib/helpers';
import { addressToUserView, slugToProjectView } from '@/lib/routeCreators';
import { Caption, P, neutralColors, brandColors, H6 } from '@giveth/ui-design-system';
import React from 'react';
import styled from 'styled-components';


interface IProjectCard {
	project: IProject;
	isNew?: boolean;
}

const ProjectCard = (props: IProjectCard) => {
	const { isNew, project } = props;
	const {
		title,
		description,
		image,
		verified,
		traceCampaignId,
		adminUser,
		slug,
		totalDonations,
	} = project;

	const { name, walletAddress } = adminUser || {};

	return (
		<Wrapper isNew={isNew}>
			<ImagePlaceholder>
				<InternalLink href={slugToProjectView(slug)}>
					<ProjectCardImage image={image} />
				</InternalLink>
			</ImagePlaceholder>
			{!isNew && (
				<BadgeContainer>
					{verified && <VerificationBadge verified />}
					{traceCampaignId && <VerificationBadge trace />}
				</BadgeContainer>
			)}
			<CardBody>
				<InternalLink href={slugToProjectView(slug)}>
					<Title>{title}</Title>
				</InternalLink>
				{name && (
					<InternalLink href={addressToUserView(walletAddress)}>
						<Author>{name}</Author>
					</InternalLink>
				)}
				<Description>{htmlToText(description)}</Description>
				{!isNew && (
					<BodyCaption>
						Raised: ${totalDonations?.toLocaleString()}
					</BodyCaption>
				)}
			</CardBody>
		</Wrapper>
	);
};

const BadgeContainer = styled.div`
	display: flex;
	position: absolute;
	padding: 16px;
`;

const BodyCaption = styled(Caption)`
	margin-top: 14px;
	color: ${neutralColors.gray[700]};
`;

const Description = styled(P)`
	height: 76px;
	overflow: hidden;
	color: ${neutralColors.gray[900]};
	margin-bottom: 20px;
`;

const CardBody = styled.div`
	margin: 50px 24px 0 24px;
	text-align: left;
`;

const Author = styled(P)`
	color: ${brandColors.pinky[500]};
	margin-bottom: 10px;
	cursor: pointer;
`;

const Title = styled(H6)`
	color: ${brandColors.deep[500]};
	font-weight: 700;
	height: 26px;
	overflow: hidden;
`;

const ImagePlaceholder = styled.div`
	height: 200px;
	width: 100%;
	position: relative;
	overflow: hidden;
	border-radius: 16px;
`;

const Wrapper = styled.div<{ isNew?: boolean }>`
	position: relative;
	height: 430px;
	max-width: 440px;
	min-width: 300px;
	border-radius: 12px;
	margin-top: 0;
	z-index: 0;
	background: ${props => props.isNew && 'white'};
	box-shadow: ${props => props.isNew && Shadow.Dark[500]};
	${mediaQueries.mobileL} {
		width: 100%;
	}
`;

export default ProjectCard;