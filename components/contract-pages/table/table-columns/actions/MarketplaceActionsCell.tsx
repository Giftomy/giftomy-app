import { useMarketplaceCancelMutation, useMarketplacePurchaseMutation, useWeb3 } from "@3rdweb-sdk/react";
import Icon from "@chakra-ui/icon";
import { ButtonGroup, Flex, Stack } from "@chakra-ui/react";
import { useMarketplace } from "@thirdweb-dev/react";
import { AuctionListing, DirectListing } from "@thirdweb-dev/sdk";
import { useSingleQueryParam } from "hooks/useQueryParam";
import { useTxNotifications } from "hooks/useTxNotifications";
import React from "react";
import { FiXCircle } from "react-icons/fi";
import { Row } from "react-table";
import { Button } from "tw-components";


interface IMarketplaceActionsCellProps {
  row: Row<DirectListing | AuctionListing>;
}

export const MarketplaceActionsCell: React.FC<IMarketplaceActionsCellProps> = ({
  row,
}) => {
  const { address } = useWeb3();
  const txNotifications = useTxNotifications(
    "Succesfully cancelled listing",
    "Error cancelling listing",
  );

  const purchaseNotifications = useTxNotifications(
    "Succesfully purchased",
    "Error purchasing",
  );

  const isOwner =
    address?.toLowerCase() === row.original.sellerAddress.toLowerCase();

  const marketplaceContract = useMarketplace(
    useSingleQueryParam("marketplace"),
  );
  const unlist = useMarketplaceCancelMutation(
    process.env.NEXT_PUBLIC_MARKET_ADDRESS,
  );

  const unlistMutation = () => {
    unlist.mutate(
      {
        listingId: row.original.id,
        listingType: row.original.type,
        amount: 1,
      },
      txNotifications,
    );
  };

  const purchase = useMarketplacePurchaseMutation(
    process.env.NEXT_PUBLIC_MARKET_ADDRESS,
  );

  const purchaseMutation = () => {
    purchase.mutate(
      {
        listingId: row.original.id,
        listingType: row.original.type,
      },
      purchaseNotifications,
    );
  };

  if (!isOwner) {
    return (
      <Button
        isLoading={purchase.isLoading}
        onClick={purchaseMutation}
        leftIcon={<Icon as={FiXCircle} />}
      >
        Collect NFT
      </Button>
    );
  }

  return (
    <Stack as={ButtonGroup} size="sm" variant="outline">
      <Flex flexDir="column" gap={1}>
        <Button
          isLoading={unlist.isLoading}
          isDisabled={!marketplaceContract}
          onClick={unlistMutation}
          leftIcon={<Icon as={FiXCircle} />}
        >
          Cancel Listing
        </Button>
      </Flex>
    </Stack>
  );
};