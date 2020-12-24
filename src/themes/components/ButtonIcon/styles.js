import styled, {css} from 'styled-components/native';
import {sanFranciscoWeights} from 'react-native-typography';
import {colors} from '../../variables';

const ButtonContainer = styled.TouchableOpacity`
	${({bordered}) =>
		bordered &&
		css`
			border-color: ${colors.blue};
			border-radius: 8px;
			border-width: 1px;
		`}
	padding:8px;
`;

const IconWrapper = styled.View`
	height: 20px;
	width: 20px;
`;

const ButtonText = styled.Text`
	color: ${colors.white};
	font-size: 12px;
	${sanFranciscoWeights.medium};
`;

export const Styled = {
	ButtonContainer,
	ButtonText,
	IconWrapper,
};
