import { useContractList, useWeb3 } from '@3rdweb-sdk/react';
import EditionDrop from '@/components/views/embeds/edition-drop';
import NFTDrop from '@/components/views/embeds/nft-drop';
import { ChevronRightIcon } from '@chakra-ui/icons';
import { Flex } from '@chakra-ui/react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';
import { utils } from 'ethers';
import { useSingleQueryParam } from 'hooks/useQueryParam';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import * as React from 'react';
import { useMemo } from 'react';
import { Heading, Text } from 'tw-components';
import { ChainId } from 'utils/network';

export default function NFTS() {
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
  console.log('combinedList: ', combinedList);

  const NFTList = (props: { nfts?: any }) => {
    return props.nfts.map(nft => {
      console.log('nft: ', nft);
      if (nft.contractType === 'nft-drop') {
        return <NFTDrop contractAddress={nft.address} address={address} />;
      }
      if (nft.contractType === 'edition-drop') {
        return (
          <EditionDrop
            contractAddress={nft.address}
            address={address}
            tokenId='0'
          />
        );
      }

      return <div>{nft.contractType} is not supported for now</div>;
    });
  };
  return (
    <Flex direction='column' gap={8} px={30}>
      <Breadcrumb
        display={{ base: 'none', md: 'block' }}
        separator={<ChevronRightIcon color='gray.500' />}
        mb={8}
      >
        <BreadcrumbItem>
          <NextLink href={`/`} passHref>
            <BreadcrumbLink>Home</BreadcrumbLink>
          </NextLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <NextLink href={`/project/${projectIdSlug}`} passHref>
            <BreadcrumbLink>Project</BreadcrumbLink>
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
                <Heading size='title.md'>NFTs</Heading>
                <Text fontStyle='italic' maxW='container.md'>
                  The list of NFTs.
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
