import Routes from '@/lib/constants/Routes';

export const slugToProjectView = (slug: string) => {
	return Routes.Project + '/' + slug;
};

export const slugToProjectDashboard = (slug: string, address: string) => {
	return `${Routes.Project}/${slug}/${address}`;
};

export const slugToProjectNFT = (slug: string, address: string) => {
  return `${Routes.Project}/${slug}/${address}/nfts`;
};

export const idToProjectEdit = (id?: string) => {
	return Routes.Project + '/' + id + '/edit';
};

export const addressToUserView = (address?: string) => {
	return Routes.User + '/' + address;
};