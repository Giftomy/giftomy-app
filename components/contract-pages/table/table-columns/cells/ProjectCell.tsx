import { ButtonGroup, Flex, Stack } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { slugToProjectView } from "@/lib/routeCreators";
import { FETCH_PROJECT_BY_WALLET } from "@/apollo/gql/gqlProjects";
import { client } from "@/apollo/apolloClient";

interface IProjectCellProps {
  address: string;
}

export const ProjectCell: React.FC<IProjectCellProps> = ({ address }) => {
  const [title, setTitle] = React.useState("");
  const [slug, setSlug] = React.useState("");

  useEffect(() => {
    if (!address) return;
    const fetchProjectByAddress = async () => {
      const {
        data: { projectByAddress },
      } = await client.query({
        query: FETCH_PROJECT_BY_WALLET,
        variables: {
          address,
          connectedWalletUserId: 1,
        },
      });

      setTitle(projectByAddress?.title);
      setSlug(projectByAddress?.slug);
    };
    fetchProjectByAddress();
  }, [address]);

  return (
    <Stack as={ButtonGroup} size="sm" variant="outline">
      <Flex flexDir="column" gap={1}>
        <a href={slugToProjectView(slug)}>{title}</a>
      </Flex>
    </Stack>
  );
};
