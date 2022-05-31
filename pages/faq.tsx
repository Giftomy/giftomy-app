import Head from 'next/head';
import FAQIndex from '@/components/views/FAQIndex';

const FAQRoute = () => {
	return (
		<div style={{ position: 'relative' }}>
			<Head>
				<title>FAQ | Giftomy</title>
			</Head>
			<FAQIndex />
		</div>
	);
};

export default FAQRoute;
