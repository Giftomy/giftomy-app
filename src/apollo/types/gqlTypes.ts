import {
	ICategory,
	IProject,
	IProjectUpdate,
} from './types';

export interface IFetchAllProjects {
	projects: IProject[];
	totalCount: number;
	categories: ICategory[];
}

export interface IProjectBySlug {
	project: IProject;
}

export interface IFetchProjectUpdates {
	projectUpdate: IProjectUpdate;
}

export interface IUserProjects {
	projects: IProject[];
	totalCount: number;
}

export interface IUserLikedProjects {
	projects: IProject[];
	totalCount: number;
}

export interface IProjectAcceptedTokensGQL {
	data: {
		getProjectAcceptTokens: IProjectAcceptedToken[];
	};
}

export interface ISuggestedProjectsGQL {
	data: {
		similarProjectsBySlug: {
			projects: IProject[];
		};
	};
}

export interface IProjectAcceptedToken {
	id?: string;
	symbol: string;
	networkId: number;
	address: string;
	mainnetAddress?: string;
	name: string;
	decimals: number;
	isGivbackEligible?: boolean;
}
