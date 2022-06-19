import { IUserPublicProfileView } from "./UserPublicProfile.view";
import { Loading } from "./projectsTab/PublicProfileProjectsTab";
import { IProject } from "@/apollo/types/types";
import Pagination from "@/components/Pagination";
import ProjectCard from "@/components/project-card/ProjectCard";
import NothingToSee from "@/components/views/userPublicProfile/NothingToSee";
import { mediaQueries } from "@/lib/constants/constants";
import { Box, Button, Center, Flex, Grid, Heading, Icon, Image, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Spinner, Stack, Text, useToast } from "@chakra-ui/react";
import { useNFTDrop } from '@thirdweb-dev/react';
import { NFTDrop } from '@thirdweb-dev/sdk';
import { useState, useEffect } from 'react';
import { useMoralisQuery } from 'react-moralis';
import styled from 'styled-components';


const itemPerPage = 6;


const NFTCard: React.FC = ({ metadata }) => {
  console.log('metadata', metadata);
  const { name, description, id, image } = metadata;

  return (
    <Box w='100%' textAlign='center'>
      <Image
        objectFit='contain'
        width='200px'
        height='200px'
        margin='auto'
        src={image}
        alt={name}
      />
      <Heading size='display.md' fontWeight='title' as='h1' mt='20px'>
        {name}
      </Heading>
      {description && (
        <Heading noOfLines={2} as='h2' size='subtitle.md' mb='20px'>
          {description}
        </Heading>
      )}
    </Box>
  );
};

const PublicProfileNFTsTab: FC<IUserPublicProfileView> = ({
  myAccount,
  user,
}) => {
  const [loading, setLoading] = useState(false);
  const [nfts, setNFTs] = useState<any[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [page, setPage] = useState(0);
  // TODO
  const contractAddress = '0x2732d8e5199B5AB424732c0634f8dF5562Cf37f0';
  const nftDrop = useNFTDrop(contractAddress);

  const { fetch } = useMoralisQuery(
    "collectednfts",
    (query) => query.equalTo("buyer", user.walletAddress),
    [],
    { autoFetch: false }
  );
  console.log("myAccount, user", myAccount, user);
  useEffect(() => {
    if (!user) return;

    const fetchUserProjects = async () => {
      setLoading(true);

      // const results = await fetch();
      // console.log("Successfully retrieved " + results + " monsters.");
      // // Do something with the returned Moralis.Object values
      // for (let i = 0; i < results.length; i++) {
      // 	const object = results[i];
      // 	console.log(object.id + " - " + object.get("buyer"));
      // }
      // Address of the wallet to get the NFTs of

      const results = await nftDrop.getOwned(user.walletAddress);
      console.log("results", results);
      setLoading(false);
      if (results?.length) {
        setNFTs(results);
        setTotalCount(results.length);
      }
    };
    fetchUserProjects().then();
  }, [page, user]);

  return (
    <Container>
      {!loading && totalCount == 0 ? (
        <NothingWrapper>
          <NothingToSee
            title={`${
              myAccount ? "You haven't" : "This user hasn't"
            } liked any nfts yet!`}
            heartIcon
          />
        </NothingWrapper>
      ) : (
        <LikedContainer>
          {nfts?.map((nft) => (
            <NFTCard metadata={nft.metadata} key={nft.metadata.id.toString()} />
          ))}
          {loading && <Loading />}
        </LikedContainer>
      )}
      <Pagination
        currentPage={page}
        totalCount={totalCount}
        setPage={setPage}
        itemPerPage={itemPerPage}
      />
    </Container>
  );
};

const Container = styled.div`
  margin-bottom: 80px;
`;

const NothingWrapper = styled.div`
  position: relative;
  padding: 100px 0;
`;

const LikedContainer = styled.div`
  display: grid;
  position: relative;
  gap: 24px;
  margin-bottom: 40px;
  padding: 0;
  align-items: center;
  ${mediaQueries.laptop} {
    grid-template-columns: repeat(2, 1fr);
  }
  ${mediaQueries.laptopL} {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export default PublicProfileNFTsTab;