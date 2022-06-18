import HomeChangeMakers from './HomeChangeMakers';
import HomeExploreProjects from './HomeExploreProjects';
import HomeFromBlog from './HomeFromBlog';
import HomeGetUpdates from './HomeGetUpdates';
import HomeHeader from './HomeHeader';
import HomePurpleSection from './HomePurpleSection';
import { IProject } from '@/apollo/types/types';
import NFTDrop from '@/components/views/embeds/nft-drop';
import { Providers } from 'components/app-layouts/providers';

interface IHomeView {
	projects: IProject[];
	totalCount: number;
}

const projectsSlice = 6;

const HomeIndex = (props: IHomeView) => {
	const { projects, totalCount } = props;
	return (
		<Providers>
			<NFTDrop contractAddress='0x2732d8e5199B5AB424732c0634f8dF5562Cf37f0' expectedChainId={80001} />
			<HomeHeader />
			<HomeExploreProjects
				totalCount={totalCount}
				projects={projects.slice(0, projectsSlice)}
			/>
			{/* <HomePurpleSection />
			<HomeExploreProjects
				projects={projects.slice(projectsSlice)}
				noTitle
			/>
			<HomeChangeMakers />
			<HomeFromBlog />
			<HomeGetUpdates /> */}
		</Providers>
	);
};

export default HomeIndex;