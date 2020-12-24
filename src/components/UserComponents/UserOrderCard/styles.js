import styled from 'styled-components/native';
import {Button} from '@ui-kitten/components';

import {colors, sizes, fontSizes} from '../../../themes/variables';
import {sanFranciscoWeights} from 'react-native-typography';

const OrderCard = styled.View`
	border-color: ${colors.neutralLight};
	border-radius: 8px;
	border-width: 1px;
	margin-bottom: ${sizes.medium};
	padding: 20px;
`;

const OrderNumber = styled.Text`
	${sanFranciscoWeights.bold};
	font-size: ${fontSizes.large};
	margin-bottom: ${sizes.medium};
`;

const TextContainer = styled.View`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	width: 100%;
`;

const OrderText = styled.Text`
	${sanFranciscoWeights.regular};
	color: ${colors.neutralGrey};
	font-size: ${fontSizes.small};
	margin-bottom: ${sizes.small};
`;

const OrderTextRight = styled.Text`
	${sanFranciscoWeights.regular};
	color: ${colors.black};
	font-size: ${fontSizes.small};
	margin-bottom: ${sizes.small};
`;

const OrderTextPrice = styled.Text`
	${sanFranciscoWeights.bold};
	color: ${colors.blue};
	font-size: ${fontSizes.small};
	margin-bottom: ${sizes.small};
`;

const ButtonContainer = styled.View`
	align-self: flex-end;
	display: flex;
	width: 100%;
`;

const DetailButton = styled(Button)`
	width: 100%;
`;

export const Styled = {
	OrderCard,
	DetailButton,
	OrderNumber,
	OrderText,
	TextContainer,
	OrderTextRight,
	OrderTextPrice,
	ButtonContainer,
};
