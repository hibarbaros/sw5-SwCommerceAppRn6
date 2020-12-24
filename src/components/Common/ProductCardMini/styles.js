import styled from 'styled-components/native';
import {colors, fontSizes} from '../../../themes/variables';
import {sanFranciscoWeights} from 'react-native-typography';

const CardContainer = styled.View`
	border-color: ${colors.neutralLight};
	border-radius: 8px;
	border-width: 1px;
	flex-direction: row;
	margin-bottom: 20px;
	padding: 20px;
`;
const CardImage = styled.View`
	height: 50px;
	margin-right: 20px;
	width: 50px;
`;

const TextContainer = styled.View`
	flex-direction: column;
	margin: auto 0px;
	margin-bottom: 20px;
	width: 80%;
`;
const CardTitle = styled.Text`
	color: ${colors.themeColor};
	${sanFranciscoWeights.bold};
	margin-bottom: 10px;
`;
const VariantTitle = styled.Text`
	font-size: ${fontSizes.medium};
	margin-bottom: 10px;
`;
export const Styled = {
	CardContainer,
	CardImage,
	TextContainer,
	CardTitle,
	VariantTitle,
};
