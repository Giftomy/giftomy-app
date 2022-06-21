import { menuRoutes } from '../menu/menuRoutes';
import {
  HBContainer,
  HBPic,
  HeaderLinks,
  HeaderLink,
  StyledHeader,
  WalletButton,
  WBInfo,
  SmallCreateProject,
  Logo,
  MenuAndButtonContainer,
  CoverLine,
  SmallCreateProjectParent,
  LargeCreateProject,
  MainLogoBtn,
} from './Header.sc';
import HeaderRoutesResponsive from './HeaderResponsiveRoutes';
import { ConnectWallet, useWeb3 } from '@3rdweb-sdk/react';
import MenuWallet from '@/components/menu/MenuWallet';
import { Flex } from '@/components/styled-components/Flex';
import useModal from '@/context/ModalProvider';
import useUser from '@/context/UserProvider';
import { ETheme, useGeneral } from '@/context/general.context';
import { ThemeType } from '@/context/theme.context';
import Routes from '@/lib/constants/Routes';
import { isUserRegistered, shortenAddress } from '@/lib/helpers';
import { Button, GLink } from '@giveth/ui-design-system';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC, useState, useEffect } from 'react';

export interface IHeader {
  theme?: ThemeType;
  show?: boolean;
}

const Header: FC<IHeader> = () => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [isCreateRoute, setIsCreateRoute] = useState(false);

  // const { active, account, library } = useWeb3React();
  const { address, chainId } = useWeb3();
  const {
    state: { user, isEnabled, isSignedIn },
  } = useUser();
  const {
    actions: { showWelcomeModal, showSignWithWallet, showCompleteProfile },
  } = useModal();
  const { theme } = useGeneral();
  const router = useRouter();

  const showLinks = !isCreateRoute;

  useEffect(() => {
    setIsCreateRoute(router.route.startsWith(Routes.CreateProject));
  }, [router.route]);

  useEffect(() => {
    const threshold = 0;
    let lastScrollY = window.pageYOffset;
    let ticking = false;

    const updateScrollDir = () => {
      const scrollY = window.pageYOffset;

      if (Math.abs(scrollY - lastScrollY) < threshold) {
        ticking = false;
        return;
      }
      const show = scrollY <= lastScrollY;
      setShowHeader(show);
      if (!show) {
        setShowUserMenu(false);
      }
      lastScrollY = scrollY > 0 ? scrollY : 0;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollDir);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll);

    return () => window.removeEventListener('scroll', onScroll);
  }, [showHeader]);

  const handleCreateButton = () => {
    if (!isEnabled) {
      showWelcomeModal();
    } else if (!isSignedIn) {
      showSignWithWallet();
    } else if (isUserRegistered(user)) {
      router.push(Routes.CreateProject);
    } else {
      showCompleteProfile();
    }
  };

  return (
    <StyledHeader
      justifyContent='space-between'
      alignItems='center'
      theme={theme}
      show={showHeader}
    >
      <Flex>
        {isCreateRoute ? (
          <Logo onClick={router.back}>
            <Image
              width='26px'
              height='26px'
              alt='Giftomy logo'
              src={`/images/back-2.svg`}
            />
          </Logo>
        ) : (
          <>
            <MainLogoBtn>
              <Link href={Routes.Home} passHref>
                <Logo>
                  <Image
                    width='48px'
                    height='48px'
                    alt='Giftomy logo'
                    src={`/images/logo/logo.svg`}
                  />
                </Logo>
              </Link>
            </MainLogoBtn>
            <HeaderRoutesResponsive />
          </>
        )}
      </Flex>
      {showLinks && (
        <HeaderLinks theme={theme}>
          {menuRoutes.map((link, index) => (
            <Link href={link.href[0]} passHref key={index}>
              <HeaderLink
                size='Big'
                theme={theme}
                active={link.href.includes(router.route)}
              >
                {link.title}
              </HeaderLink>
            </Link>
          ))}
        </HeaderLinks>
      )}

      <Flex gap='8px'>
        <LargeCreateProject>
          <Button
            label='Create A Project'
            size='small'
            buttonType={theme === ETheme.Light ? 'primary' : 'secondary'}
            onClick={handleCreateButton}
          />
        </LargeCreateProject>
        <SmallCreateProjectParent>
          <SmallCreateProject
            onClick={handleCreateButton}
            theme={theme}
            label=''
            icon={
              <Image
                src='/images/plus-white.svg'
                width={16}
                height={16}
                alt='create project'
              />
            }
            linkType={theme === ETheme.Light ? 'primary' : 'secondary'}
          />
        </SmallCreateProjectParent>
        {address && chainId && (
          <>
            <MenuAndButtonContainer
              onClick={() => setShowUserMenu(true)}
              onMouseEnter={() => setShowUserMenu(true)}
              onMouseLeave={() => setShowUserMenu(false)}
            >
              <WalletButton outline theme={theme}>
                <HBContainer>
                  <HBPic
                    src={
                      user?.avatar
                        ? user.avatar
                        : '/images/placeholders/profile.png'
                    }
                    alt='Profile Pic'
                    width={'24px'}
                    height={'24px'}
                  />
                  <WBInfo>
                    <GLink size='Medium'>
                      {user?.name || shortenAddress(address)}
                    </GLink>
                  </WBInfo>
                </HBContainer>
                <CoverLine theme={theme} />
              </WalletButton>
              {showUserMenu && <MenuWallet />}
            </MenuAndButtonContainer>
          </>
        )}
        <ConnectWallet />
      </Flex>
    </StyledHeader>
  );
};

export default Header;
