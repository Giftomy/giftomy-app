import { useMutationWithInvalidate } from "./query/useQueryWithNetwork";
import { getAllQueryKey, getTotalCountQueryKey } from "./useGetAll";
import { useMarketplace } from "@thirdweb-dev/react";
import {
  ListingType,
  NewAuctionListing,
  NewDirectListing,
} from "@thirdweb-dev/sdk";

export function useMarketplaceDirectListMutation(contractAddress?: string) {
  const marketplace = useMarketplace(contractAddress);
  return useMutationWithInvalidate(
    async (data: NewDirectListing) => {
      return await marketplace?.direct.createListing({
        ...data,
      });
    },
    {
      onSuccess: (_data, _variables, _options, invalidate) => {
        return invalidate([
          getAllQueryKey(marketplace),
          getTotalCountQueryKey(marketplace),
        ]);
      },
    },
  );
}

export function useMarketplaceAuctionListMutation(contractAddress?: string) {
  const marketplace = useMarketplace(contractAddress);
  return useMutationWithInvalidate(
    async (data: NewAuctionListing) => {
      return await marketplace?.auction.createListing({
        ...data,
      });
    },
    {
      onSuccess: (_data, _variables, _options, invalidate) => {
        return invalidate([
          getAllQueryKey(marketplace),
          getTotalCountQueryKey(marketplace),
        ]);
      },
    },
  );
}

interface CancelListingProps {
  listingId: string;
  listingType: ListingType;
}

export function useMarketplaceCancelMutation(contractAddress?: string) {
  const marketplace = useMarketplace(contractAddress);
  return useMutationWithInvalidate(
    async (data: CancelListingProps) => {
      const { listingId, listingType } = data;

      if (listingType === ListingType.Auction) {
        return await marketplace?.auction.cancelListing(listingId);
      } else {
        return await marketplace?.direct.cancelListing(listingId);
      }
    },
    {
      onSuccess: (_data, _variables, _options, invalidate) => {
        return invalidate([
          getAllQueryKey(marketplace),
          getTotalCountQueryKey(marketplace),
        ]);
      },
    },
  );
}

interface PurchaseProps {
  listingId: string;
  listingType: ListingType;
  amount?: number;
}

export function useMarketplacePurchaseMutation(contractAddress?: string) {
  const marketplace = useMarketplace(contractAddress);
  return useMutationWithInvalidate(
    async (data: PurchaseProps) => {
      const { listingId, listingType, amount = 1 } = data;
      if (listingType === ListingType.Auction) {
        const bufferBps = 500;
        return await marketplace?.setBidBufferBps(bufferBps);
      } else {
        return await marketplace?.buyoutListing(listingId, amount);
      }
    },
    {
      onSuccess: (_data, _variables, _options, invalidate) => {
        return invalidate([
          getAllQueryKey(marketplace),
          getTotalCountQueryKey(marketplace),
        ]);
      },
    },
  );
}
