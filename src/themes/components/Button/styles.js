import styled from 'styled-components/native';
import {colors, fontFamilies, fontSizes} from '../../variables';

const RightAccessoriesContainer = styled.View`
	position: absolute;
	right: 15px;
`;

// Primary Button
const PrimaryContainer = styled.TouchableOpacity`
	align-items: center;
	background-color: ${colors.gray7};
	border-radius: 15px;
	justify-content: center;
	padding: ${(props) => props.size}px;
	margin: 10px 0px;
	flex-direction: row;
	display: flex;
`;

const PrimaryText = styled.Text`
	color: ${colors.white};
	font-size: 18px;
	font-family: ${fontFamilies.secondaryRegular};
`;
// Primary Button

// Secondary Button
const SecondaryContainer = styled.TouchableOpacity`
	align-items: center;
	background-color: ${colors.pink};
	border-radius: 15px;
	justify-content: center;
	padding: ${(props) => props.size}px;
`;

const SecondaryText = styled.Text`
	color: ${colors.white};
	font-size: 18px;
	font-family: ${fontFamilies.secondaryRegular};
`;
// Secondary Button

// Input Button
const FormInputContainer = styled.TouchableOpacity`
	align-items: flex-start;
	border-color: ${colors.pink};
	border-width: 1px;
	border-radius: 8px;
	padding: 20px;
	justify-content: center;
`;

const FormInputText = styled.Text`
	color: ${colors.black};
	font-size: ${fontSizes.medium};
	font-family: ${fontFamilies.secondaryRegular};
`;
// Input Button

export const Styled = {
	PrimaryContainer,
	PrimaryText,
	SecondaryContainer,
	SecondaryText,
	RightAccessoriesContainer,
	FormInputContainer,
	FormInputText,
};
