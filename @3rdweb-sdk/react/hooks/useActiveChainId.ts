import { useSingleQueryParam } from "hooks/useQueryParam";
import {
  SUPPORTED_CHAIN_ID,
  SupportedNetwork,
  getChainIdFromNetwork,
  getNetworkFromChainId,
} from "utils/network";
import { useWeb3React } from '@web3-react/core';

export function useActiveChainId(): SUPPORTED_CHAIN_ID | undefined {
  // const networkFromUrl = useSingleQueryParam<SupportedNetwork>("network");
  // return getChainIdFromNetwork(networkFromUrl);
  const { chainId } = useWeb3React();
  return chainId;
}

export function useActiveNetwork(): SupportedNetwork | undefined {
  const activeChainId = useActiveChainId();
  return activeChainId && getNetworkFromChainId(activeChainId);
}
