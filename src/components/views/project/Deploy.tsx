import { useWeb3React } from "@web3-react/core";
import { useMarketplace } from "@thirdweb-dev/react";
import {
  Flex,
} from '@chakra-ui/react';
import { useContractMetadata } from "@3rdweb-sdk/react";
import { ConnectWallet } from "@3rdweb-sdk/react";
import { Providers } from "components/app-layouts/providers";
import { ListButton } from "components/contract-pages/action-buttons/ListButton";
import { ContractLayout } from "components/contract-pages/contract-layout";
import { ContractItemsTable } from "components/contract-pages/table/marketplace";
import { DeployableContractTable } from 'components/contract-components/contract-table';
import { useTrack } from 'hooks/analytics/useTrack';
import { Heading, Text } from 'tw-components';

export default function DeployPage({
  walletAddress,
}: {
  walletAddress: string;
}) {
  const marketAddress = process.env.NEXT_PUBLIC_MARKET_ADDRESS;
  const marketplace = useMarketplace(marketAddress);
  const metadata = useContractMetadata(marketplace);
  const { account } = useWeb3React();

  if (!account) return "Please connect to your wallet";

  const isProjectOwner = account.toLowerCase() === walletAddress.toLowerCase();

  const primaryAction = isProjectOwner && (
    <div>
      <ListButton contract={marketplace} />
      <ConnectWallet borderRadius="full" colorScheme="primary" />
    </div>
  );
  const { Track } = useTrack({
    page: 'contracts',
  });

  const TYPES = ['nft-drop', 'edition-drop'];

  return (
    <Providers>
    <Track>
      <Flex gap={8} direction='column'>
        <Flex gap={2} direction='column'>
          <Heading size='title.md'>Pre-built contracts</Heading>
          <Text fontStyle='italic'>
            Contracts created by the thirdweb team that you can deploy
          </Text>
        </Flex>
        <DeployableContractTable hasDescription contractIds={TYPES} />
      </Flex>
    </Track>
    </Providers>
  );
}