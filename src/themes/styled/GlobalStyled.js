import styled from 'styled-components';
import {colors} from '../variables';

const Title = styled.Text`
	color: palevioletred;
	font-size: 18px;
	text-align: left;
`;

const Wrapper = styled.View`
	padding: 20px;
`;

const MarginTop = styled.View`
	margin-top: ${({value = 0}) => value}px;
`;

const Bullet = styled.View`
	background-color: ${(props) =>
		props.selected ? colors.blue : colors.themeColor};
	border-radius: 8px;
	height: 16px;
	margin: 0px 3px;
	width: 16px;
`;

export const GlobalStyled = {
	Wrapper,
	Title,
	MarginTop,
	Bullet,
};
