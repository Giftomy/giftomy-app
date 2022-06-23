import React from 'react';
import {
	H5,
	Caption,
	brandColors,
	semanticColors,
} from '@giveth/ui-design-system';
import dynamic from 'next/dynamic';
import styled from 'styled-components';

import { InputContainer, InputErrorMessage, Label } from './Create.sc';
import { ECreateErrFields } from '@/components/views/create/CreateProject';

const RichTextInput = dynamic(() => import('@/components/RichTextInput'), {
	ssr: false,
});

const DescriptionInput = (props: {
	setValue: (e: string) => void;
	error: string;
	value: string;
}) => {
	const { value, setValue, error } = props;
	return (
		<>
			<H5 id={ECreateErrFields.DESCRIPTION}>
				Tell us about your project...
			</H5>
			<CaptionContainer>
				Aim for 200-500 words.
			</CaptionContainer>
			<InputContainerStyled error={error}>
				<Label>Project story</Label>
				<RichTextInput
					style={TextInputStyle}
					setValue={setValue}
					value={value}
				/>
			</InputContainerStyled>
			<ErrorStyled>{error || null}</ErrorStyled>
		</>
	);
};

const InputContainerStyled = styled(InputContainer)<{ error: string }>`
	.ql-container.ql-snow,
	.ql-toolbar.ql-snow {
		border: ${props =>
			props.error && `2px solid ${semanticColors.punch[500]}`};
	}

	&:focus-within {
		.ql-toolbar.ql-snow,
		.ql-container.ql-snow {
			border: ${props =>
				!props.error && `2px solid ${brandColors.giv[600]}`};
		}
	}
`;

const ErrorStyled = styled(InputErrorMessage)`
	margin-top: -10px;
	margin-bottom: 20px;
`;

const CaptionContainer = styled(Caption)`
	margin: 8.5px 0 0 0;
	span {
		cursor: pointer;
		color: ${brandColors.pinky[500]};
	}
`;

const TextInputStyle = {
	marginTop: '4px',
	fontFamily: 'body',
};

export default DescriptionInput;
