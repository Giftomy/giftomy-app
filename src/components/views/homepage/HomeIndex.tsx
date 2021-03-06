import HomeExploreProjects from './HomeExploreProjects';
import HomeHeader from './HomeHeader';
import { useWeb3 } from '@3rdweb-sdk/react';
import { IProject } from '@/apollo/types/types';
import ProjectCard from '@/components/project-card/ProjectCard';
import EditionDrop from '@/components/views/embeds/edition-drop';
import NFTDrop from '@/components/views/embeds/nft-drop';
import { Flex } from '@chakra-ui/react';


interface IHomeView {
  projects: IProject[];
  totalCount: number;
}

const projectsSlice = 6;

const HomeIndex = (props: IHomeView) => {
  const { projects, totalCount } = props;
  const { address } = useWeb3();
  return (
    <>
      <Flex align='center' w='100%' py='85px' px='30px'>
        {!!totalCount && <ProjectCard key={projects[0].id} project={projects[0]} />}
        {/* TODO */}
        <NFTDrop
          contractAddress='0x2732d8e5199B5AB424732c0634f8dF5562Cf37f0'
          address={address}
        />
        {/* <EditionDrop
          contractAddress='0xB85485e8367b7F99927159f4337b660d60f862EB'
          address={address}
          tokenId='0'
        /> */}
      </Flex>
      <HomeHeader />
      <HomeExploreProjects
        totalCount={totalCount}
        projects={projects.slice(0, projectsSlice)}
      />
    </>
  );
};

export default HomeIndex;