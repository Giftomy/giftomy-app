import { Breadcrumbs } from "./Breadcrumbs";
import { FooterWrapper } from "@/components/Footer/FooterWrapper";
import { HeaderWrapper } from "@/components/Header/HeaderWrapper";
import { Container, Flex } from "@chakra-ui/react";
import { InsufficientFunds } from "components/notices/InsufficientFunds";
import React from "react";
import { ComponentWithChildren } from 'types/component-with-children';


export const AppShell: ComponentWithChildren = ({ children }) => {
  return (
    <Flex
      minH='calc(100vh - env(safe-area-inset-top) - env(safe-area-inset-bottom))'
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
        pt='100px'
      >
        <HeaderWrapper />
        <Container flexGrow={1} as='main' maxW='100%' p='0' m='0'>
          <Breadcrumbs />
          {children}
        </Container>
        <InsufficientFunds />
        <FooterWrapper />
      </Flex>
    </Flex>
  );
};