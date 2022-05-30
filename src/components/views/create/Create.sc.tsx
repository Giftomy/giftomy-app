import styled from 'styled-components';
import {
	neutralColors,
	GLink,
	brandColors,
	semanticColors,
} from '@giveth/ui-design-system';
import { Regular_Input } from '@/components/styled-components/Input';

export const InputContainer = styled.div`
	margin: 24px 0 64px 0;
	color: ${neutralColors.gray[100]};
`;

export const Label = styled(GLink)`
	height: 18px;
	margin: 4px 0 0 0;
	color: ${neutralColors.gray[100]};
`;

export const TinyLabel = styled(GLink)`
	height: 14px;
	margin: 4px 0 0 0;
	color: ${neutralColors.gray[100]};
`;

export const InputErrorMessage = styled.div`
	color: ${semanticColors.punch[500]};
	font-size: 12px;
	margin-top: 5px;
	word-break: break-word;
`;

export const InputWithError = styled(Regular_Input)<{ error: boolean }>`
	border: ${props => props.error && `2px solid ${semanticColors.punch[500]}`};
	&:focus-within {
		border: ${props => !props.error && `2px solid ${brandColors.giv[600]}`};
	}
`;
