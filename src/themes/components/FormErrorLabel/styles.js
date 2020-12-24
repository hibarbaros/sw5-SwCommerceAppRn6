import styled from 'styled-components/native';
import {Text} from 'react-native';
import {colors, fontSizes} from '../../variables';
import {sanFranciscoWeights} from 'react-native-typography';

const StyledErrorText = styled(Text)`
	color: ${colors.red};
	flex-direction: row;
	font-size: ${fontSizes.tiny};
	margin: 10px 0px;
	${sanFranciscoWeights.bold};
`;
export const Styled = {
	StyledErrorText,
};
