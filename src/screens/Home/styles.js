import styled from 'styled-components/native';
import {colors} from '../../themes/variables';
import {sanFranciscoWeights} from 'react-native-typography';

const Container = styled.View`
	display: flex;
	flex: 1;
	flex-direction: column;
	margin-top: 20px;
	min-height: 200px;
`;

const CategoryTitleContainer = styled.View`
	align-self: flex-start;
	margin-left: 10px;
`;

const CategoryTitleBorder = styled.View`
	border-bottom-width: 4px;
	border-color: #d8d8d8;
	left: 0px;
	opacity: 0.5;
	top: 17px;
`;

const MainCarouselContainer = styled.View`
	margin-bottom: 20px;
	display: flex;
	flex: 1;
`;

const CategoryTitle = styled.Text`
	color: ${colors.themeColor};
	${sanFranciscoWeights.bold};
	display: flex;
	font-size: 18px;
	font-weight: bold;
`;

export const Styled = {
	CategoryTitle,
	Container,
	CategoryTitleContainer,
	CategoryTitleBorder,
	MainCarouselContainer,
};
