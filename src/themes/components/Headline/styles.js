import styled from 'styled-components/native';
import {colors, fontFamilies} from '../../variables';

const H1 = styled.Text`
	font-size: 48px;
	line-height: 72px;
	color: ${colors.gray7};
	font-family: ${fontFamilies.primaryRegular};
`;
const H2 = styled.Text`
	font-size: 34px;
	line-height: 56px;
	color: ${colors.gray7};
	font-family: ${fontFamilies.primaryRegular};
`;
const H3 = styled.Text`
	font-size: 24px;
	line-height: 34px;
	color: ${colors.gray7};
	font-family: ${fontFamilies.primaryRegular};
`;
const H4 = styled.Text`
	font-size: 20px;
	line-height: 28px;
	color: ${colors.gray5};
	font-family: ${fontFamilies.secondaryRegular};
`;

const H5 = styled.Text`
	font-size: 20px;
	line-height: 28px;
	color: ${colors.gray5};
	font-family: ${fontFamilies.secondaryRegular};
`;

const H6 = styled.Text`
	font-size: 20px;
	line-height: 28px;
	color: ${colors.gray5};
	font-family: ${fontFamilies.secondaryRegular};
`;

export const Styled = {
	H1,
	H2,
	H3,
	H4,
	H5,
	H6,
};
