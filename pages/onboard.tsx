import Head from 'next/head';
import OnboardView from '@/components/views/onboarding/Onboarding.view';

const OnboardingRoute = () => {
	return (
		<>
			<Head>
				<title>Onboarding | Giftomy</title>
			</Head>
			<OnboardView />
		</>
	);
};

export default OnboardingRoute;
