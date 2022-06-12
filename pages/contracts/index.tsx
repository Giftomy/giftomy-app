import {
  Alert,
  AlertIcon,
  AlertTitle,
  Box,
  Center,
  Flex,
  Spinner,
} from '@chakra-ui/react';
import { useAddress } from '@thirdweb-dev/react';
import { ChainId, KNOWN_CONTRACTS_MAP } from '@thirdweb-dev/sdk';
import { Providers } from 'components/app-layouts/providers';
import { DeployableContractTable } from 'components/contract-components/contract-table';
import { usePublishedContractsQuery } from 'components/contract-components/hooks';
import { CustomSDKContext } from 'contexts/custom-sdk-context';
import { useTrack } from 'hooks/analytics/useTrack';
import { ReactElement } from 'react';
import { IoRefreshSharp } from 'react-icons/io5';
import { Badge, Button, Heading, LinkButton, Text } from 'tw-components';

const ContractsHomepageWrapped: React.FC = () => {
  const { Track } = useTrack({
    page: 'contracts',
  });

  const TYPES = ['nft-drop', 'edition-drop'];

  return (
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
  );
};

export default function ContractsHomepage() {
  return (
    <CustomSDKContext desiredChainId={ChainId.Mumbai}>
      <Providers>
        <ContractsHomepageWrapped />
      </Providers>
    </CustomSDKContext>
  );
}

// ContractsHomepage.getLayout = (page: ReactElement) => (
//   <Providers>{page}</Providers>
// );
