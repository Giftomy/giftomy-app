import { MenuContainer } from './Menu.sc';
import { SignWithWalletModal } from '@/components/modals/SignWithWalletModal';
import useModal from '@/context/ModalProvider';
import useUser from '@/context/UserProvider';
import { ETheme, useGeneral } from '@/context/general.context';
import Routes from '@/lib/constants/Routes';
import links from '@/lib/constants/links';
import { isUserRegistered } from '@/lib/helpers';
import { brandColors, neutralColors } from '@giveth/ui-design-system';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

const MenuWallet = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [SignWithWallet, setSignWithWallet] = useState<boolean>(false);
  const [queueRoute, setQueueRoute] = useState<string>('');

  const router = useRouter();

  const {
    state: { user, isSignedIn },
    actions: { signOut },
  } = useUser();

  const {
    actions: { showCompleteProfile },
  } = useModal();

  const { theme } = useGeneral();

  const goRoute = (input: {
    url: string;
    requiresSign: boolean;
    requiresRegistration?: boolean;
  }) => {
    const { url, requiresSign, requiresRegistration } = input;
    if (requiresRegistration && !isUserRegistered(user)) {
      showCompleteProfile();
      if (url === Routes.CreateProject) return;
    }
    if (requiresSign && !isSignedIn) {
      setQueueRoute(url);
      return setSignWithWallet(true);
    }
    router.push(url);
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <>
      {SignWithWallet && (
        <SignWithWalletModal
          callback={() => {
            router.push(queueRoute);
            setQueueRoute('');
          }}
          setShowModal={() => {
            setSignWithWallet(false);
            setQueueRoute('');
          }}
        />
      )}
      <WalletMenuContainer
        isMounted={isMounted}
        theme={theme}
        isSignedIn={isSignedIn || false}
      >
        <Menus>
          {walletMenuArray.map(i => (
            <MenuItem key={i.title} onClick={() => goRoute(i)} theme={theme}>
              {i.title}
            </MenuItem>
          ))}
          {isSignedIn && (
            <MenuItem onClick={signOut} theme={theme}>
              Sign out
            </MenuItem>
          )}
        </Menus>
      </WalletMenuContainer>
    </>
  );
};

const walletMenuArray = [
  {
    title: 'My Account',
    url: Routes.MyAccount,
    requiresSign: true,
  },
  {
    title: 'My Projects',
    url: Routes.MyProjects,
    requiresSign: true,
  },
  {
    title: 'My NFTs',
    url: Routes.MyAccount,
    requiresSign: true,
  },
  {
    title: 'Create a Project',
    url: Routes.CreateProject,
    requiresSign: true,
    requiresRegistration: true,
  },
  { title: 'Report a bug', url: links.REPORT_ISSUE, requiresSign: false },
];

const MenuItem = styled.a`
  height: 45px;
  line-height: 45px;
  padding: 0 16px;
  font-size: 14px;
  cursor: pointer;
  color: ${props =>
    props.theme === ETheme.Dark
      ? neutralColors.gray[100]
      : neutralColors.gray[800]};
  border-top: 2px solid
    ${props =>
      props.theme === ETheme.Dark
        ? brandColors.giv[300]
        : neutralColors.gray[300]};
  &:hover {
    background-color: ${props =>
      props.theme === ETheme.Dark
        ? brandColors.giv[700]
        : neutralColors.gray[200]};
  }
`;

const Menus = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 15px;
  padding: 0 !important;
  /* border-bottom: 2px solid ${brandColors.giv[300]}; */
`;

interface IWalletMenuContainer {
  isSignedIn: boolean;
}

const WalletMenuContainer = styled(MenuContainer)<IWalletMenuContainer>`
  max-height: ${props => (props.isSignedIn ? '350px' : '310px')};
`;

export default MenuWallet;
