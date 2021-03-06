import Image from 'next/image';
import { IconVerified, Overline } from '@giveth/ui-design-system';
import styled from 'styled-components';
import { FlexCenter } from '../styled-components/Flex';

const VerificationBadge = (props: { verified?: boolean }) => {
	const { verified } = props;
	const text = verified ? 'VERIFIED' : '';

	return (
		<Wrapper>
      {verified && <IconVerified />}
			<TextBadge styleType='Small'>{text}</TextBadge>
		</Wrapper>
	);
};

const Wrapper = styled(FlexCenter)`
	height: 30px;
	background: rgba(9, 17, 57, 0.6);
	border-radius: 56px;
	color: white;
	padding: 0 12px 0 10px;
	margin-right: 8px;
`;

const TextBadge = styled(Overline)`
	padding-left: 0.5rem;
	margin-right: 5px;
`;

export default VerificationBadge;
