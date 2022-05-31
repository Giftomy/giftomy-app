import Head from 'next/head';
import SupportIndex from '@/components/views/support/SupportIndex';

const SupportRoute = () => {
	return (
		<>
			<Head>
				<title>Support | Giftomy</title>
			</Head>
			<SupportIndex />
		</>
	);
};

export default SupportRoute;
