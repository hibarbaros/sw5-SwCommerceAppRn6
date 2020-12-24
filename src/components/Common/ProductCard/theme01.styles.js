import styled from 'styled-components/native';
import {colors} from '../../../themes/variables';
import {sanFranciscoWeights} from 'react-native-typography';

const Card = styled.TouchableOpacity`
	background-color: white;
	border: 1px solid ${colors.light};
	border-radius: 10px;
	box-shadow: 8px 8px 8px #f4f4f4;
	flex: 1;
	height: 200px;
	margin: 10px;
	overflow: hidden;
`;

const CardContainer = styled.View`
	display: flex;
	flex-direction: column;
`;

const CurrencyContainer = styled.View`
	align-items: flex-start;
	bottom: 0px;
	padding: 5px 15px;
`;

const ImageContainer = styled.View`
	margin: 0px auto;
	margin-top: 10px;
	width: 100%;
`;

const MediaImage = styled.Image`
	height: 100%;
	width: 100%;
`;

const ProductName = styled.Text`
	color: ${colors.black};
	font-size: 12px;
	margin-right: 10px;
	${sanFranciscoWeights.medium};
	margin-top: 5px;
	width: 60%;
`;

const ContentWrapper = styled.View`
	align-items: center;
	background-color: ${colors.white};
	border-radius: 8px;
	bottom: 10px;
	flex-direction: row;
	justify-content: center;
	margin: 0px 5%;
	opacity: 0.8;
	padding: 10px;
	position: absolute;
	width: 90%;
`;

export const Styled = {
	Card,
	ProductName,
	CardContainer,
	CurrencyContainer,
	ImageContainer,
	MediaImage,
	ContentWrapper,
};
