import React from 'react';
import { IProject } from '@/apollo/types/types';
import { htmlToText } from '@/lib/helpers';

export const HomeMeta = () => {
	return (
		<>
			<meta name='title' content='Giftomy' />
			<meta
				name='description'
				content='Collect NFTs from public goods projects.'
			/>

			<meta property='og:type' content='website' />
			<meta property='og:url' content='https://giftomy.xyz/' />
			<meta property='og:title' content='Giftomy' />
			<meta
				property='og:description'
				content='Collect NFTs from public goods projects.'
			/>
			<meta
				property='og:image'
				content='https://giftomy.xyz/images/logo/logo.svg'
			/>

			<meta property='twitter:card' content='summary_large_image' />
			<meta property='twitter:url' content='https://giftomy.xyz/' />
			<meta property='twitter:title' content='Giftomy' />
			<meta
				property='twitter:description'
				content='Collect NFTs from public goods projects.'
			/>
			<meta
				property='twitter:image'
				content='https://giftomy.xyz/images/logo/logo.svg'
			/>
			<meta name='twitter:card' content='summary_large_image' />
		</>
	);
};

export const ProjectsMeta = () => {
	return (
		<>
			<meta name='title' content='Projects | Giftomy' />
			<meta
				name='description'
				content='Collect NFTs from public goods projects'
			/>

			<meta property='og:type' content='website' />
			<meta property='og:url' content='https://giftomy.xyz/' />
			<meta property='og:title' content='Projects | Giftomy' />
			<meta
				property='og:description'
				content='Collect NFTs from public goods projects'
			/>
			<meta
				property='og:image'
				content='https://giftomy.xyz/images/logo/logo.svg'
			/>

			<meta property='twitter:card' content='summary_large_image' />
			<meta property='twitter:url' content='https://giftomy.xyz/' />
			<meta property='twitter:title' content='Projects | Giftomy' />
			<meta
				property='twitter:description'
				content='Collect NFTs from public goods projects'
			/>
			<meta
				property='twitter:image'
				content='https://giftomy.xyz/images/logo/logo.svg'
			/>
			<meta name='twitter:card' content='summary_large_image' />
		</>
	);
};

export const ProjectMeta = (props: {
	project?: IProject;
	preTitle?: string;
}) => {
	const { project, preTitle } = props;
	const metaDescription = htmlToText(project?.description?.slice(0, 100));
	return (
		<>
			<meta
				name='title'
				content={(preTitle || '') + ' ' + project?.title}
			/>
			<meta name='description' content={metaDescription} />
			<meta property='og:type' content='website' />
			<meta
				property='og:title'
				content={(preTitle || '') + ' ' + project?.title}
			/>
			<meta property='og:description' content={metaDescription} />
			<meta property='og:image' content={project?.image} />
			<meta property='twitter:card' content='summary_large_image' />
			<meta
				property='twitter:title'
				content={(preTitle || '') + ' ' + project?.title}
			/>
			<meta property='twitter:description' content={metaDescription} />
			<meta property='twitter:image' content={project?.image} />
		</>
	);
};
