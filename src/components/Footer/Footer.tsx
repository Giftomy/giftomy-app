import {
	P,
	brandColors,
	IconDocs,
	IconMedium,
	IconGithub,
	IconRedit,
	IconYoutube,
	IconTwitter,
	Caption,
} from '@giveth/ui-design-system';
import Link from 'next/link';
import styled from 'styled-components';

import { ETheme, useGeneral } from '@/context/general.context';
import links from '@/lib/constants/links';
import Routes from '@/lib/constants/Routes';
import { mediaQueries } from '@/lib/constants/constants';
import { Flex } from '@/components/styled-components/Flex';
import { Container } from '@/components/Grid';

const Footer = () => {
	const { theme } = useGeneral();
	const textColor = "white"
		// theme === ETheme.Dark ? brandColors.deep[100] : brandColors.deep[800];
	return (
		<FooterContainer>
			<ContainerStyled>
				<LeftContainer wrap={1}>
					<LinkColumn>
						<Link href={Routes.Home}>
							<a>
								<LinkItem color={textColor}>Home</LinkItem>
							</a>
						</Link>
						<Link href={Routes.Projects}>
							<a>
								<LinkItem color={textColor}>Projects</LinkItem>
							</a>
						</Link>
					</LinkColumn>
				</LeftContainer>
				<RightContainer color={textColor}>
					<SocialContainer>
						{/* <a href={links.MEDIUM}>
							<IconMedium size={24} color={textColor} />
						</a> */}
						<a href={links.GITHUB}>
							<IconGithub size={24} color={textColor} />
						</a>
						<a href={links.TWITTER}>
							<IconTwitter size={24} color={textColor} />
						</a>
						{/* <a href={links.YOUTUBE}>
							<IconYoutube size={24} color={textColor} />
						</a> */}
					</SocialContainer>
				</RightContainer>
			</ContainerStyled>
		</FooterContainer>
	);
};

export default Footer;

const ContainerStyled = styled(Container)`
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
`;

const FooterContainer = styled.div`
	position: relative;
	padding: 35px 0 12px;
	z-index: 2;
`;

const LeftContainer = styled(Flex)`
	justify-content: space-between;
	gap: 0;

	${mediaQueries.laptopL} {
		gap: 0 72px;
	}
`;

const RightContainer = styled.div<{ color: string }>`
	text-align: left;
	color: ${props => props.color};

	${mediaQueries.laptop} {
		text-align: right;
	}
`;

const SocialContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: 20px;
	justify-content: space-between;
	margin-bottom: 32px;

	${mediaQueries.mobileL} {
		gap: 40px;
	}
`;

const LinkColumn = styled(Flex)`
	flex-direction: column;
	gap: 8px;
	margin-bottom: 32px;
	width: 180px;
`;

const LinkItem = styled(P)<{ color: string }>`
	cursor: pointer;
	color: ${props => props.color};
`;

