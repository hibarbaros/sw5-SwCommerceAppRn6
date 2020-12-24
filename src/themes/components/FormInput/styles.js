import styled from 'styled-components/native';
import {Input} from '@ui-kitten/components';
import {colors, fontSizes, fontFamilies} from '../../variables';

export const StyledTextInput = styled(Input).attrs({
	placeholderTextColor: colors.gray6,
	textStyle: {
		fontSize: 12,
		padding: 5,
	},
})`
	font-size: ${fontSizes.small};
	font-family: ${fontFamilies.secondaryRegular};
`;

export const Styled = {
	StyledTextInput,
};
