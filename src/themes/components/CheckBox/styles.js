import styled from 'styled-components/native';
import {Check} from 'react-native-feather';
import {colors, fontFamilies} from '../../variables';

const Container = styled.TouchableOpacity`
	display: flex;
	justify-content: flex-start;
	align-items: center;
	flex-direction: row;
	width: 100%;
	flex-shrink: 1;
`;

const Box = styled.TouchableOpacity`
	border-color: ${colors.secondaryColor};
	border-width: 1px;
	width: 20px;
	height: 20px;
	padding: 5px;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: row;
`;

const Label = styled.Text`
	color: ${colors.themeColor};
	font-size: 12px;
	font-family: ${fontFamilies.secondaryRegular};
	margin-left: 10px;
	flex-shrink: 1;
`;

export const CheckIcon = styled(Check).attrs((props) => ({
	stroke: colors.secondaryColor,
	width: 15,
	height: 15,
}))`
	opacity: ${(props) => (props.isChecked ? 1 : 0)};
`;

export const Styled = {
	Container,
	CheckIcon,
	Label,
	Box,
};
