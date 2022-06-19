import {
	Box,
	ButtonGroup,
	Container,
	Divider,
	Flex,
	Icon,
	Stack,
} from '@chakra-ui/react';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import React from 'react';
import { RiGasStationFill } from 'react-icons/ri';
import { SiDiscord, SiGithub, SiTwitter, SiYoutube } from 'react-icons/si';
import { InsufficientFunds } from 'components/notices/InsufficientFunds';
import { Logo } from 'components/logo';
import { ColorModeToggle } from 'components/color-mode/color-mode-toggle';
import { ConnectWallet } from '@3rdweb-sdk/react';
import { Breadcrumbs } from './Breadcrumbs';
import {
	Link,
	LinkButton,
	Text,
	TrackedIconButton,
	TrackedLink,
} from 'tw-components';
import { ComponentWithChildren } from 'types/component-with-children';

export const AppShell: ComponentWithChildren = ({ children }) => {
	const { pathname } = useRouter();

	const isCustomContractLayout =
		pathname === '/[wallet]/[network]/[...customContract]';

	return (
		<Flex
			h='calc(100vh - env(safe-area-inset-top) - env(safe-area-inset-bottom))'
			w='calc(100vw - env(safe-area-inset-left) - env(safe-area-inset-right))'
			position='relative'
			overflow='hidden'
			backgroundColor='backgroundBody'
		>
			<Flex
				transition='margin 350ms ease'
				zIndex='docked'
				width='100%'
				flexGrow={1}
				flexShrink={0}
				flexDir='column'
				overflowY='auto'
				id='tw-scroll-container'
				pt="100px"
			>
				{isCustomContractLayout ? (
					<Box as='main' flexGrow={1}>
						{children}
					</Box>
				) : (
					<Container
						flexGrow={1}
						as='main'
						maxW='container.page'
						py={8}
					>
						<Breadcrumbs />
						{children}
					</Container>
				)}
				{pathname !== '/dashboard' && (
					<>
						<InsufficientFunds />
					</>
				)}
			</Flex>
		</Flex>
	);
};
