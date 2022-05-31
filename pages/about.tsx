import Head from 'next/head';
import AboutIndex from '@/components/views/about/AboutIndex';

const AboutRoute = () => {
	return (
		<>
			<Head>
				<title>About Us | Giftomy</title>
			</Head>
			<AboutIndex />
		</>
	);
};

export default AboutRoute;
