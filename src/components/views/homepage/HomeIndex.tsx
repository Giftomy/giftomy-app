import HomeChangeMakers from './HomeChangeMakers';
import HomeExploreProjects from './HomeExploreProjects';
import HomeFromBlog from './HomeFromBlog';
import HomeGetUpdates from './HomeGetUpdates';
import HomeHeader from './HomeHeader';
import HomePurpleSection from './HomePurpleSection';
import { IProject } from '@/apollo/types/types';
import { BigArc } from '@/components/styled-components/Arc';
import Listings from '@/components/views/homepage/Listings';

interface IHomeView {
	projects: IProject[];
	totalCount: number;
}

const projectsSlice = 6;

const HomeIndex = (props: IHomeView) => {
	const { projects, totalCount } = props;
	return (
		<>
			<BigArc />
			<HomeHeader />
			<Listings />
			<HomeExploreProjects
				totalCount={totalCount}
				projects={projects.slice(0, projectsSlice)}
			/>
			<HomePurpleSection />
			<HomeExploreProjects
				projects={projects.slice(projectsSlice)}
				noTitle
			/>
			<HomeChangeMakers />
			<HomeFromBlog />
			<HomeGetUpdates />
		</>
	);
};

export default HomeIndex;
