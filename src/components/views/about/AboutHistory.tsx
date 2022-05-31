import { useState } from 'react';
import styled from 'styled-components';
import {
	brandColors,
	ButtonLink,
	H3,
	H4,
	Lead,
} from '@giveth/ui-design-system';
import { FlexCenter } from '../../styled-components/Flex';
import links from '@/lib/constants/links';

const AboutHistory = () => {
	const [sliderSection, setSliderSection] = useState<number>(0);

	return (
		<>
			<Upper>
				<Rect>
					<span>Giftomy</span> was founded in 2022.
				</Rect>
			</Upper>
			<End>
				{sliderContent.map((elem, index) => (
					<SliderTextSection
						key={`slider-content-${index}`}
						active={sliderSection === index}
					>
						<Title>{elem.title}</Title>
						<Lead>{elem.body}</Lead>
					</SliderTextSection>
				))}

				<SliderButtons>
					{sliderContent.map((elem, index) => (
						<SliderButton
							key={`slider-button-${index}`}
							active={sliderSection === index}
							onClick={() => setSliderSection(index)}
						/>
					))}
				</SliderButtons>
			</End>
		</>
	);
};

const SliderButton = styled.div<{ active: boolean }>`
	border-radius: 50%;
	width: 23px;
	height: 23px;
	cursor: pointer;
	border: 2px solid ${brandColors.giv[500]};
	background: ${props =>
		props.active ? brandColors.giv[500] : 'transparent'};
`;

const SliderButtons = styled(FlexCenter)`
	gap: 13px;
	margin: 66px auto 0 auto;
`;

const SliderTextSection = styled.div<{ active: boolean }>`
	display: ${props => (props.active ? 'flex' : 'none')};
	flex-direction: column;
	place-items: center;
	min-height: 390px;
`;

const ReadMoreButton = styled(ButtonLink)`
	background-color: ${brandColors.pinky[500]};
	margin-top: 32px;

	&:hover {
		background-color: ${brandColors.pinky[500]}80;
	}
`;

const Title = styled(H3)`
	margin-bottom: 24px;
`;

const End = styled.div`
	text-align: center;
	max-width: 840px;
	margin: 72px auto 0;
`;

const Rect = styled(H4)`
	padding: 48px;
	background: ${brandColors.giv[500]};
	color: white;
	max-width: 530px;
	border-radius: 12px;

	span {
		color: ${brandColors.mustard[500]};
	}
`;

const UpperText = styled(Rect)`
	color: ${brandColors.giv[900]};
	background: ${brandColors.mustard[500]};
	position: relative;

	span {
		color: ${brandColors.giv[500]};
	}
`;

const Upper = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: 25px 50px;
`;

const sliderContent = [
	{
		title: 'Start our journey',
		body: 'We are a team of passionate people who build dapps in web3 field.',
	},
];

export default AboutHistory;
