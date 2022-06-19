import { Breadcrumbs } from "./Breadcrumbs";
import { Container, Flex } from "@chakra-ui/react";
import { InsufficientFunds } from "components/notices/InsufficientFunds";
import { useRouter } from 'next/router';
import React from "react";
import { ComponentWithChildren } from 'types/component-with-children';

export const AppShell: ComponentWithChildren = ({ children }) => {
	const { pathname } = useRouter();
  return (
    <Flex
      h="calc(100vh - env(safe-area-inset-top) - env(safe-area-inset-bottom))"
      w="calc(100vw - env(safe-area-inset-left) - env(safe-area-inset-right))"
      position="relative"
      overflow="hidden"
      backgroundColor="backgroundBody"
    >
      <Flex
        transition="margin 350ms ease"
        zIndex="docked"
        width="100%"
        flexGrow={1}
        flexShrink={0}
        flexDir="column"
        overflowY="auto"
        id="tw-scroll-container"
        pt="100px"
      >
				<Container flexGrow={1} as="main" maxW="container.page" py={8}>
					<Breadcrumbs />
					{children}
				</Container>
        {pathname !== "/dashboard" && (
          <>
            <InsufficientFunds />
          </>
        )}
      </Flex>
    </Flex>
  );
};