import {
	EProjectStatus,
} from '@/apollo/types/gqlEnums';
// todo
export interface IProject {
	id?: string;
	title?: string;
	balance?: number;
	image?: string;
	slug: string;
	creationDate?: string;
	admin?: string;
	description?: string;
	walletAddress?: string;
	impactLocation?: string;
	qualityScore?: number;
	verified?: boolean;
	listed?: boolean | null;
	categories: ICategory[];
	reaction?: IReaction;
	totalReactions: number;
	adminUser: {
		id?: string;
		email?: string;
		name?: string;
		walletAddress?: string;
	};
	users: IUser[];
	totalProjectUpdates?: number;
	status: {
		id?: string;
		name?: EProjectStatus;
	};
	updatedAt: string;
	organization?: {
		name: string;
		label: string;
		supportCustomTokens: boolean;
	};
}

export interface IProjectEdition {
	id?: string;
	title?: string;
	image?: string;
	description?: string;
	walletAddress?: string;
	impactLocation?: string;
	categories: ICategory[];
	adminUser: {
		walletAddress?: string;
	};
	status: {
		name?: string;
	};
	slug: string;
}

export interface IProjectCreation {
	title: string;
	description: string;
	impactLocation?: any;
	categories: any;
	organisationId: number;
	walletAddress: string;
	image?: string;
	isDraft?: boolean;
}

export interface IUser {
	id?: string;
	firstName?: string;
	lastName?: string;
	name?: string;
	email?: string;
	avatar?: string;
	walletAddress?: string;
	url?: string;
	location?: string;
	token?: string;
	userId?: string;
	totalReceived?: number;
	projectsCount?: number;
	likedProjectsCount?: number;
}

export interface IReaction {
	id: string;
	userId: string;
}

export interface IMediumBlogPost {
	title: string;
	author: string;
	description: string;
	link: string;
	pubDate: string;
	guid: string;
}

export interface ICategory {
	name: string;
}

export interface IProjectBySlug {
	project: IProject;
}

export interface IProjectUpdate {
	content: string;
	createdAt: string;
	id: string;
	projectId: string;
	title: string;
	userId: string;
}
