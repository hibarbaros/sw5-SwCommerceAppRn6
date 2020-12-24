import styled from 'styled-components/native';
import {Button} from '@ui-kitten/components';

import {colors} from '../../../themes/variables';

const ActionSheetContainer = styled.View`
	padding: 30px;
`;

const ButtonContainer = styled.View`
	margin: 0px;
`;

const StyledButton = styled(Button)`
	margin: 0px;
	background-color: ${colors.pink};
	justify-content: space-between;
`;

export const Styled = {
	ActionSheetContainer,
	ButtonContainer,
	StyledButton,
};
