import { DropSvg } from './drop';
import { parseIneligibility } from './parseIneligibility';
import { useActiveChainId } from '@3rdweb-sdk/react';
import {
  Box,
  Button,
  Center,
  Flex,
  Grid,
  Heading,
  Icon,
  Image,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Spinner,
  Stack,
  Text,
  useToast,
} from '@chakra-ui/react';
import {
  ThirdwebProvider,
  useActiveClaimCondition,
  useAddress,
  useChainId,
  useClaimedNFTSupply,
  useClaimIneligibilityReasons,
  useClaimNFT,
  useContractMetadata,
  useNFTDrop,
  useUnclaimedNFTSupply,
} from '@thirdweb-dev/react';
import { NFTDrop } from '@thirdweb-dev/sdk';
import { formatUnits, parseUnits } from 'ethers/lib/utils';
import React, { useRef, useState } from 'react';
import { IoDiamondOutline } from 'react-icons/io5';

interface ClaimPageProps {
  contractAddress: string;
  contract?: NFTDrop;
  address?: string;
}

const ClaimButton: React.FC<ClaimPageProps> = ({
  contractAddress,
  address,
}) => {
  // const address = useAddress();
  // const chainId = useChainId();
  const contract = useNFTDrop(contractAddress);
  const [quantity, setQuantity] = useState(1);
  const loaded = useRef(false);
  const toast = useToast();
  const activeClaimCondition = useActiveClaimCondition(contract);
  const claimIneligibilityReasons = useClaimIneligibilityReasons(contract, {
    quantity,
    walletAddress: address,
  });
  const unclaimedSupply = useUnclaimedNFTSupply(contract);
  const claimedSupply = useClaimedNFTSupply(contract);
  const claimMutation = useClaimNFT(contract);

  const bnPrice = parseUnits(
    activeClaimCondition.data?.currencyMetadata.displayValue || '0',
    activeClaimCondition.data?.currencyMetadata.decimals,
  );
  const priceToMint = bnPrice.mul(quantity);

  const claim = async () => {
    claimMutation.mutate(
      { to: address as string, quantity },
      {
        onSuccess: () => {
          toast({
            title: 'Successfully claimed.',
            status: 'success',
            duration: 5000,
            isClosable: true,
          });
        },
        onError: err => {
          console.error(err);
          toast({
            title: 'Failed to claim drop.',
            status: 'error',
            duration: 9000,
            isClosable: true,
          });
        },
      },
    );
  };

  // Only sold out when available data is loaded
  const isSoldOut = unclaimedSupply?.data?.eq(0);

  const isLoading =
    !!address && claimIneligibilityReasons.isLoading && !loaded.current;

  const canClaim =
    !isSoldOut && !!address && !claimIneligibilityReasons.data?.length;

  const isEnabled = !!contract && !!address;

  let buttonText = isSoldOut
    ? 'Sold out'
    : canClaim
    ? `Mint${quantity > 1 ? ` ${quantity}` : ''}${
        activeClaimCondition.data?.price.eq(0)
          ? ' (Free)'
          : activeClaimCondition.data?.currencyMetadata.displayValue
          ? ` (${formatUnits(
              priceToMint,
              activeClaimCondition.data.currencyMetadata.decimals,
            )} ${activeClaimCondition.data?.currencyMetadata.symbol})`
          : ''
      }`
    : claimIneligibilityReasons.data?.length
    ? parseIneligibility(claimIneligibilityReasons.data, quantity)
    : 'Minting Unavailable';

  if (!isEnabled) {
    buttonText = 'Sign in to claim';
  }

  return (
    <Stack spacing={4} align='center' w='100%'>
      <Flex direction={{ base: 'column', md: 'row' }} gap={2}>
        <NumberInput
          inputMode='numeric'
          value={quantity}
          onChange={(stringValue, value) => {
            if (stringValue === '') {
              setQuantity(1);
            } else {
              setQuantity(value);
            }
          }}
          min={1}
          max={1000}
          maxW={{ base: '100%', md: '100px' }}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        <Button
          fontSize={{ base: 'label.md', md: 'label.lg' }}
          isLoading={claimMutation.isLoading || isLoading}
          isDisabled={!canClaim}
          leftIcon={<IoDiamondOutline />}
          onClick={claim}
          colorScheme='blue'
        >
          {buttonText}
        </Button>
      </Flex>
      {claimedSupply.data && (
        <Text size='label.md' color='white.800'>
          {`${claimedSupply.data?.toString()} / ${(
            claimedSupply.data?.add(unclaimedSupply.data || 0) || 0
          ).toString()} claimed`}
        </Text>
      )}
    </Stack>
  );
};

const ClaimPage: React.FC<ClaimPageProps> = ({ contractAddress, address }) => {
  const { data: metadata, isLoading } = useContractMetadata(contractAddress);

  if (isLoading) {
    return (
      <Center w='100%' h='500px'>
        <Stack direction='row' align='center'>
          <Spinner />
          <Heading size='label.sm'>Loading...</Heading>
        </Stack>
      </Center>
    );
  }

  return (
    <Flex w='100%' textAlign='center' direction='column' align='center'>
      {metadata?.image ? (
        <Image
          objectFit='contain'
          maxW='300px'
          margin='auto'
          src={metadata?.image}
          alt={metadata?.name}
        />
      ) : (
        <Icon maxW='100%' maxH='100%' as={DropSvg} />
      )}
      <Heading size='display.md' fontWeight='title' as='h1' mt='20px'>
        {metadata?.name}
      </Heading>
      {metadata?.description && (
        <Heading noOfLines={2} as='h2' size='subtitle.md' mb='20px'>
          {metadata.description}
        </Heading>
      )}
      <ClaimButton contractAddress={contractAddress} address={address} />
    </Flex>
  );
};

const App: React.FC<ClaimPageProps> = ({ contractAddress, address }) => {
  const activeChainId = useActiveChainId();

  return (
    <>
      <ThirdwebProvider desiredChainId={activeChainId || 80001}>
        <ClaimPage contractAddress={contractAddress} address={address} />
      </ThirdwebProvider>
    </>
  );
};

export default App;
