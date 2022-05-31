import { useMoralisQuery } from "react-moralis";
import { IUserPublicProfileView } from "./UserPublicProfile.view";
import { Loading } from "./projectsTab/PublicProfileProjectsTab";
import { IProject } from "@/apollo/types/types";
import Pagination from "@/components/Pagination";
import ProjectCard from "@/components/project-card/ProjectCard";
import NothingToSee from "@/components/views/userPublicProfile/NothingToSee";
import { mediaQueries } from "@/lib/constants/constants";
import styled from "styled-components";
import { useState, useEffect } from "react";

const itemPerPage = 6;

const PublicProfileNFTsTab: FC<IUserPublicProfileView> = ({
  myAccount,
  user,
}) => {
  const [loading, setLoading] = useState(false);
  const [nfts, setNFTs] = useState<any[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [page, setPage] = useState(0);

  const { fetch } = useMoralisQuery(
    "collectednfts",
    (query) => query.equalTo("buyer", user.walletAddress),
    [],
    { autoFetch: false }
  );

  useEffect(() => {
    if (!user) return;

    const fetchUserProjects = async () => {
      setLoading(true);

      const results = await fetch();
      console.log("Successfully retrieved " + results + " monsters.");
      // Do something with the returned Moralis.Object values
      for (let i = 0; i < results.length; i++) {
      	const object = results[i];
      	console.log(object.id + " - " + object.get("buyer"));
      }

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
            // <ProjectCard key={nft.id} nft={nft} />
						<p key={nft.id}>{nft.get("assetContract")} | {nft.get("totalPricePaid")}</p>
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
