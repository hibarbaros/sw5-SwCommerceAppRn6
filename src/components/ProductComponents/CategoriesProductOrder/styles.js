import styled from 'styled-components/native';
import ActionSheet from 'react-native-actions-sheet';
import {sanFranciscoWeights} from 'react-native-typography';

const StyledActionSheet = styled(ActionSheet)`
	padding: 20px;
`;

const ActionSheetWrapper = styled.View`
	padding: 20px;
`;

const Item = styled.TouchableOpacity`
	border-bottom-width: 1px;
	border-color: #ccc;
	flex-direction: row;
	margin-bottom: 10px;
	padding-bottom: 5px;
	width: 80%;
`;

const ItemText = styled.Text`
	${sanFranciscoWeights.thin};
`;

export const Styled = {
	StyledActionSheet,
	ActionSheetWrapper,
	Item,
	ItemText,
};
