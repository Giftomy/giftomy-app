import { Flex } from "@chakra-ui/react";
import { ChainId } from "@thirdweb-dev/sdk";
import { ReactElement } from "react";
import { AppLayout } from "components/app-layouts/app";
import { DeployableContractTable } from "components/contract-components/contract-table";
import { CustomSDKContext } from "contexts/custom-sdk-context";
import { useTrack } from "hooks/analytics/useTrack";
import { Heading, Text } from "tw-components";

const ContractsHomepageWrapped: React.FC = () => {
  const { Track } = useTrack({
    page: "contracts",
  });

  const TYPES = ["nft-drop", "edition-drop"];

  return (
    <Track>
      <Flex gap={8} direction="column">
        <Flex gap={2} direction="column">
          <Heading size="title.md">Pre-built contracts</Heading>
          <Text fontStyle="italic">
            Contracts templates that you can deploy
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
      <ContractsHomepageWrapped />
    </CustomSDKContext>
  );
}

ContractsHomepage.getLayout = (page: ReactElement) => (
  <AppLayout>{page}</AppLayout>
  // <Providers>{page}</Providers>
);
