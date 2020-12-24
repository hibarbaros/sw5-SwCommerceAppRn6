import styled from 'styled-components/native';
import {Text, View} from 'react-native-ui-lib';
import {sanFranciscoWeights} from 'react-native-typography';

const ItemContainer = styled(View)`
	display: flex;
	flex-direction: column;
	width: 100%;
`;

const IconContainer = styled(View)`
	height: 30px;
	width: 30px;
`;

const ItemText = styled(Text)`
	${sanFranciscoWeights.regular};
	padding: 5px 20px;
	width: 100%;
`;

export const Styled = {
	ItemContainer,
	IconContainer,
	ItemText,
};
