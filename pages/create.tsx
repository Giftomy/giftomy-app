import Head from 'next/head';
import CreateView from '@/components/views/create/CreateIndex';

const CreateRoute = () => {
	return (
		<>
			<Head>
				<title>Create a Project | Giftomy</title>
			</Head>
			<CreateView />
		</>
	);
};

export default CreateRoute;
