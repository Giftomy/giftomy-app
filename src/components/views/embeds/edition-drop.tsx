import { DropSvg } from "./drop";
import { parseIneligibility } from "./parseIneligibility";
import { useActiveChainId } from '@3rdweb-sdk/react';
import { Button, Center, Flex, Grid, Heading, Icon, Image, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Spinner, Stack, Text, useToast } from '@chakra-ui/react';
import { ThirdwebProvider, useActiveClaimCondition, useAddress, useChainId, useClaimIneligibilityReasons, useClaimNFT, useEditionDrop, useNFT, useTotalCirculatingSupply } from '@thirdweb-dev/react';
import { EditionDrop } from '@thirdweb-dev/sdk';
import { BigNumber } from 'ethers';
import { formatUnits, parseUnits } from 'ethers/lib/utils';
import React, { useRef, useState } from 'react';
import { IoDiamondOutline } from 'react-icons/io5';

interface ClaimPageProps {
  contract?: EditionDrop;
  contractAddress?: string;
  expectedChainId?: number;
  tokenId?: number;
  address?: string;
}

const ClaimButton: React.FC<ClaimPageProps> = ({
  contractAddress,
  contract,
  expectedChainId,
  tokenId,
  address,
}) => {
  // const contract = useEditionDrop(contractAddress);
  // const address = useAddress();
  // const chainId = useChainId();
  const [quantity, setQuantity] = useState(1);
  const loaded = useRef(false);
  const { data: totalSupply } = useTotalCirculatingSupply(contract, tokenId);

  const activeClaimCondition = useActiveClaimCondition(contract, tokenId);
  const claimIneligibilityReasons = useClaimIneligibilityReasons(
    contract,
    { quantity, walletAddress: address },
    tokenId,
  );
  const claimMutation = useClaimNFT(contract);

  const isEnabled = !!contract && !!address;

  const bnPrice = parseUnits(
    activeClaimCondition.data?.currencyMetadata.displayValue || '0',
    activeClaimCondition.data?.currencyMetadata.decimals,
  );

  const priceToMint = bnPrice.mul(quantity);

  const isSoldOut =
    activeClaimCondition.data &&
    parseInt(activeClaimCondition.data?.availableSupply) === 0;

  const availableSupply = activeClaimCondition.data?.availableSupply;

  const toast = useToast();

  const claim = async () => {
    claimMutation.mutate(
      { to: address as string, tokenId, quantity },
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

  const isLoading = claimIneligibilityReasons.isLoading && !loaded.current;
  console.log(
    'claimIneligibilityReasons.isLoading, !loaded.current: ',
    claimIneligibilityReasons.isLoading,
    !loaded.current
  );
  console.log('claimMutation.isLoading', claimMutation.isLoading);
  const canClaim =
    !isSoldOut && !!address && !claimIneligibilityReasons.data?.length;

  const maxQuantity = activeClaimCondition.data?.maxQuantity;

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
      <Flex w='100%' direction={{ base: 'column', md: 'row' }} gap={2}>
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
          isLoading={isLoading || claimMutation.isLoading}
          isDisabled={!canClaim}
          leftIcon={<IoDiamondOutline />}
          onClick={claim}
          w='full'
          colorScheme='blue'
          fontSize={{ base: 'label.md', md: 'label.lg' }}
        >
          {buttonText}
        </Button>
      </Flex>
      {activeClaimCondition.data && (
        <Text size='label.md' color='green.800'>
          {`${totalSupply || '0'} ${
            maxQuantity !== 'unlimited'
              ? `/ ${(totalSupply || BigNumber.from(0)).add(
                  Number(availableSupply || 0),
                )}`
              : ''
          } claimed`}
        </Text>
      )}
    </Stack>
  );
};

const ClaimPage: React.FC<ClaimPageProps> = ({
  contractAddress,
  address,
  expectedChainId,
}) => {
  const [tokenId, setTokenId] = useState(0);
  const contract = useEditionDrop(contractAddress);
  const tokenMetadata = useNFT(contract, tokenId);
  console.log('contract', contract);
  console.log('tokenMetadata.isLoading', tokenMetadata.isLoading);
  let metadataElem
  if (tokenMetadata.isLoading) {
    metadataElem = (
      <Center w='100%' h='100%'>
        <Stack direction='row' align='center'>
          <Spinner />
          <Heading size='label.sm'>Loading...</Heading>
        </Stack>
      </Center>
    );
  } else {
    const metadata = tokenMetadata.data?.metadata;
    metadataElem = (
      <>
        <Grid
          bg='#F2F0FF'
          border='1px solid rgba(0,0,0,.1)'
          borderRadius='20px'
          w='178px'
          h='178px'
          placeContent='center'
          overflow='hidden'
        >
          {metadata?.image ? (
            <Image
              objectFit='contain'
              w='100%'
              h='100%'
              src={metadata?.image}
              alt={metadata?.name}
            />
          ) : (
            <Icon maxW='100%' maxH='100%' as={DropSvg} />
          )}
        </Grid>
        <Heading size='display.md' fontWeight='title' as='h1'>
          {metadata?.name}
        </Heading>
        {metadata?.description && (
          <Heading noOfLines={2} as='h2' size='subtitle.md'>
            {metadata.description}
          </Heading>
        )}
      </>
    );
  }


  return (
    <Center w='100%' h='100%'>
      <Flex direction='column' align='center' gap={4} w='100%'>
        {metadataElem}
        <NumberInput
          inputMode='numeric'
          value={tokenId}
          onChange={(stringValue, value) => {
            if (stringValue === '') {
              setTokenId(0);
            } else {
              setTokenId(value);
            }
          }}
          min={0}
          maxW={{ base: '100%', md: '100px' }}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>

        <ClaimButton
          contract={contract}
          tokenId={tokenId}
          expectedChainId={expectedChainId}
          address={address}
        />
      </Flex>
    </Center>
  );
};

const App: React.FC<ClaimPageProps> = ({ contractAddress, address }) => {
  const activeChainId = useActiveChainId();
  console.log('activeChainId: ', activeChainId);
  return (
    <>
      <ThirdwebProvider desiredChainId={activeChainId || 80001}>
        <ClaimPage
          contractAddress={contractAddress}
          address={address}
          expectedChainId={activeChainId}
        />
      </ThirdwebProvider>
    </>
  );
};

export default App;