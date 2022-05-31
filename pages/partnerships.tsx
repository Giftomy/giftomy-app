import Head from 'next/head';
import PartnershipsIndex from '@/components/views/partnerships/PartnershipsIndex';

const PartnershipsRoute = () => {
	return (
		<>
			<Head>
				<title>Partnerships | Giftomy</title>
			</Head>
			<PartnershipsIndex />
		</>
	);
};

export default PartnershipsRoute;
