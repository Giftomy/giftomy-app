import { ErrorContainer, ArcMustardBottom, ArcMustardTop, SocialContainer, TextContainer, CustomGearImage, CustomGearsImage, MustardSpan, LogoContainer, StyledImage } from './ErrorsIndex.sc';
import discord from '/public/images/icons/discord.svg';
import giftomyFontLogo from '/public/images/icons/giftomy_font_logo.svg';
import medium from '/public/images/icons/medium.svg';
import twitter from '/public/images/icons/twitter.svg';
import { useGeneral } from '@/context/general.context';
import links from '@/lib/constants/links';
import { H1, H4 } from '@giveth/ui-design-system';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';


const MaintenanceIndex = () => {
	const { setShowFooter, setShowHeader } = useGeneral();
	const {
		TWITTER: twitterLink,
		DISCORD: discordLink,
		MEDIUM: mediumLink,
	} = links;

	useEffect(() => {
		setShowFooter(false);
		setShowHeader(false);
		return () => {
			setShowFooter(true);
			setShowHeader(true);
		};
	}, []);

	return (
		<ErrorContainer>
			<ArcMustardTop />
			<ArcMustardBottom />
			<CustomGearImage src='/images/icons/gear.svg' loading='lazy' />
			<CustomGearsImage src='/images/icons/gears.svg' loading='lazy' />
			<TextContainer>
				<Image
					src='/images/icons/warning_mustard.svg'
					width='100'
					height='100'
					alt='error icon'
				/>
				<H1>
					Giftomy.xyz is currently offline for scheduled maintenance!
				</H1>
				<div>
					<H4>Check again in a few hours to dive</H4>
					<H4>
						<b>
							back into the{' '}
							<MustardSpan>Future of Giving</MustardSpan>
						</b>
					</H4>
				</div>
				<LogoContainer>
					<Link href='/' passHref>
						<StyledImage
							src={giftomyFontLogo}
							width='150'
							height='50'
							alt='Giftomy logo'
						/>
					</Link>
				</LogoContainer>
			</TextContainer>
			<SocialContainer>
				<a href={discordLink} target='_blank' rel='noreferrer noopener'>
					<Image
						src={discord}
						width='20'
						height='20'
						alt='Giftomy discord'
					/>
				</a>
				<a href={mediumLink} target='_blank' rel='noreferrer noopener'>
					<Image
						src={medium}
						width='20'
						height='20'
						alt='Giftomy medium'
					/>
				</a>
				<a href={twitterLink} target='_blank' rel='noreferrer noopener'>
					{' '}
					<Image
						src={twitter}
						width='20'
						height='20'
						alt='Giftomy twitter'
					/>
				</a>
			</SocialContainer>
		</ErrorContainer>
	);
};

export default MaintenanceIndex;