import styled from 'styled-components/native';
import {colors, fontFamilies} from '../../variables';

const StyledParagraph = styled.Text`
	font-size: 14px;
	color: ${colors.black};
	font-family: ${fontFamilies.secondaryRegular};
	margin: 10px 0px;
`;

export const Styled = {
	StyledParagraph,
};
