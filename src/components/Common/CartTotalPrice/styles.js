import styled, {css} from 'styled-components/native';
import {View, Text} from 'react-native-ui-lib';
import {sanFranciscoWeights} from 'react-native-typography';

import {colors} from '../../../themes/variables';

const CardContainer = styled(View)`
	border-color: ${colors.neutralLight};
	border-radius: 8px;
	border-width: 1px;
	margin-bottom: 20px;
	padding: 10px;
`;

const TextRight = styled(Text)`
	${sanFranciscoWeights.bold};
	font-size: 16px;
`;

const TextLeft = styled(Text)`
	font-size: 16px;
	${({total}) =>
		total
			? css`
					${sanFranciscoWeights.bold};
			  `
			: css`
					${sanFranciscoWeights.thin};
			  `}
`;

const TextContainer = styled(View)`
	margin-bottom: 10px;
	padding-left: 10px;
	padding-right: 10px;
	width: 100%;
	${({bordered}) =>
		bordered &&
		css`
			border-color: ${colors.neutralLight};
			border-style: solid;
			border-top-width: 1px;
			padding-top: 10px;
		`}
`;

const CurrencyContainer = styled(View)`
	flex-direction: row;
	margin-left: auto;
`;

const RightContainer = styled(View)`
	padding-left: 10px;
	padding-right: 10px;
	width: 30%;
`;

export const Styled = {
	CardContainer,
	TextContainer,
	RightContainer,
	TextRight,
	TextLeft,
	CurrencyContainer,
};
