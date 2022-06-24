import { ConnectWallet, useContractList, useContractMetadataWithAddress, useWeb3 } from '@3rdweb-sdk/react';
import { useRemoveContractMutation } from '@3rdweb-sdk/react/hooks/useRegistry';
import EditionDrop from '@/components/views/embeds/edition-drop';
import NFTDrop from '@/components/views/embeds/nft-drop';
import { ChevronRightIcon } from '@chakra-ui/icons';
import { Box, Center, Container, Flex, Icon, IconButton, Image, Link, LinkBox, LinkOverlay, Menu, MenuButton, MenuItemOption, MenuList, MenuOptionGroup, Popover, PopoverAnchor, PopoverArrow, PopoverBody, PopoverContent, SimpleGrid, Skeleton, Stack, Tab, TabList, TabPanel, TabPanels, Table, Tabs, Tbody, Td, Th, Thead, Tr, useDisclosure } from '@chakra-ui/react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';
import { useNetwork } from '@thirdweb-dev/react';
import { CONTRACTS_MAP, CommonContractOutputSchema, ContractType, ValidContractClass } from '@thirdweb-dev/sdk';
import { useWeb3React } from '@web3-react/core';
import { ChakraNextImage } from 'components/Image';
import { CONTRACT_TYPE_NAME_MAP, FeatureIconMap, UrlMap } from 'constants/mappings';
import { utils } from 'ethers';
import { useTrack } from 'hooks/analytics/useTrack';
import { useSingleQueryParam } from 'hooks/useQueryParam';
import OriginalNextLink from 'next/link';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import * as React from 'react';
import { ReactElement, useEffect, useMemo } from 'react';
import { AiFillCode, AiFillLayout, AiOutlineWarning } from 'react-icons/ai';
import { FaTrash } from 'react-icons/fa';
import { FiPlus } from 'react-icons/fi';
import { IoFilterSharp } from 'react-icons/io5';
import { SiGo, SiJavascript, SiPython, SiReact, SiSolidity } from 'react-icons/si';
import { VscDebugDisconnect } from 'react-icons/vsc';
import { Column, useFilters, useGlobalFilter, useTable } from 'react-table';
import { AddressCopyButton, Badge, Button, Card, Heading, LinkButton, Text } from 'tw-components';
import {
  ChainId,
  SUPPORTED_CHAIN_ID,
  SUPPORTED_CHAIN_IDS,
  SupportedChainIdToNetworkMap,
  getNetworkFromChainId,
} from 'utils/network';
import { shortenIfAddress } from 'utils/usedapp-external';
import { z } from 'zod';


export default function Dashboard() {
  const router = useRouter();
  const {
    query: { projectIdSlug },
  } = router;
  const wallet = useSingleQueryParam('wallet') || 'dashboard';
  const { address } = useWeb3();
  // const { account: address } = useWeb3React();

  const dashboardAddress = useMemo(() => {
    return wallet === 'dashboard'
      ? address
      : utils.isAddress(wallet)
      ? wallet
      : address;
  }, [address, wallet]);

  const mainnetQuery = useContractList(ChainId.Mainnet, dashboardAddress);
  const polygonQuery = useContractList(ChainId.Polygon, dashboardAddress);
  const avalancheQuery = useContractList(ChainId.Avalanche, dashboardAddress);
  const fantomQuery = useContractList(ChainId.Fantom, dashboardAddress);
  const rinkebyQuery = useContractList(ChainId.Rinkeby, dashboardAddress);
  const goerliQuery = useContractList(ChainId.Goerli, dashboardAddress);
  const mumbaiQuery = useContractList(ChainId.Mumbai, dashboardAddress);

  const TYPES = ['nft-drop', 'edition-drop'];
  const filterFunc = item => TYPES.indexOf(item.contractType) !== -1;
  const combinedList = useMemo(() => {
    return (
      mainnetQuery.data?.map(d => ({ ...d, chainId: ChainId.Mainnet })) || []
    )
      .concat(
        polygonQuery.data?.filter(filterFunc).map(d => ({
          ...d,
          chainId: ChainId.Polygon,
        })) || [],
      )
      .concat(
        avalancheQuery.data?.filter(filterFunc).map(d => ({
          ...d,
          chainId: ChainId.Avalanche,
        })) || [],
      )
      .concat(
        fantomQuery.data
          ?.filter(filterFunc)
          .map(d => ({ ...d, chainId: ChainId.Fantom })) || [],
      )
      .concat(
        rinkebyQuery.data
          ?.filter(filterFunc)
          .map(d => ({ ...d, chainId: ChainId.Rinkeby })) || [],
      )
      .concat(
        goerliQuery.data
          ?.filter(filterFunc)
          .map(d => ({ ...d, chainId: ChainId.Goerli })) || [],
      )
      .concat(
        mumbaiQuery.data
          ?.filter(filterFunc)
          .map(d => ({ ...d, chainId: ChainId.Mumbai })) || [],
      );
  }, [
    mainnetQuery.data,
    polygonQuery.data,
    avalancheQuery.data,
    fantomQuery.data,
    rinkebyQuery.data,
    goerliQuery.data,
    mumbaiQuery.data,
  ]);
  console.log('combinedList: ', combinedList)


  const NFTList = (props: { nfts?: any }) => {
    return props.nfts.map(nft => {
      console.log('nft: ', nft)
      if (nft.contractType === "nft-drop") {
        return (
          <NFTDrop
            contractAddress={nft.address}
            address={address}
          />
        )
      }
      if (nft.contractType === "edition-drop") {
        return (
          <EditionDrop
            contractAddress={nft.address}
            address={address}
            tokenId='0'
          />
        )
      }

      return <div>{nft.contractType} is not supported</div>
    })
  }
  return (
    <Flex direction='column' gap={8} px={30}>
      <Breadcrumb
        display={{ base: 'none', md: 'block' }}
        separator={<ChevronRightIcon color='gray.500' />}
        mb={8}
      >
        <BreadcrumbItem>
          <NextLink href={`/project/${projectIdSlug}`} passHref>
            <BreadcrumbLink>Project</BreadcrumbLink>
          </NextLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <NextLink href={`/project/${projectIdSlug}/dashboard`} passHref>
            <BreadcrumbLink>Contracts</BreadcrumbLink>
          </NextLink>
        </BreadcrumbItem>
      </Breadcrumb>

      {
        <>
          {!!combinedList.length && (
            <Flex
              justify='space-between'
              align='top'
              gap={4}
              direction={{ base: 'column', md: 'row' }}
            >
              <Flex gap={2} direction='column'>
                <Heading size='title.md'>Deployed contracts</Heading>
                <Text fontStyle='italic' maxW='container.md'>
                  The list of contract instances that have deployed.
                </Text>
              </Flex>
            </Flex>
          )}
          <NFTList nfts={combinedList} />
        </>
      }
    </Flex>
  );
}
