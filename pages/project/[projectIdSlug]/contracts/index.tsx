import { ChevronRightIcon } from "@chakra-ui/icons";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
} from "@chakra-ui/react";
import { ChainId } from "@thirdweb-dev/sdk";
import NextLink from "next/link";
import { DeployableContractTable } from "components/contract-components/contract-table";
import { CustomSDKContext } from "contexts/custom-sdk-context";
import { useTrack } from "hooks/analytics/useTrack";
import { Heading, Text } from "tw-components";
import { useRouter } from "next/router";

const ContractsHomepageWrapped: React.FC = () => {
  const { Track } = useTrack({
    page: "contracts",
  });
  const router = useRouter();
  const {
    query: { projectIdSlug },
  } = router;

  const TYPES = ["nft-drop", "edition-drop"];

  return (
    <Track>
      <Flex gap={8} direction="column">
        <Breadcrumb
          display={{ base: "none", md: "block" }}
          separator={<ChevronRightIcon color="gray.500" />}
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
          <BreadcrumbItem>
            <NextLink href={`/project/${projectIdSlug}/contracts`} passHref>
              <BreadcrumbLink>Deploy</BreadcrumbLink>
            </NextLink>
          </BreadcrumbItem>
        </Breadcrumb>

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
