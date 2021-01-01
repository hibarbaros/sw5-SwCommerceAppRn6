import styled, {css} from 'styled-components/native';
import {Button, Icon} from '@ui-kitten/components';
import {sanFranciscoWeights} from 'react-native-typography';
import {colors} from '../../variables';

const StyledButton = styled(Button)`
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

const ButtonIcon = styled(Icon)`
  height: 20px;
  width: 20px;
`;

const ButtonText = styled.Text`
  color: ${colors.white};
  font-size: 12px;
  ${sanFranciscoWeights.medium};
`;

export const Styled = {
  StyledButton,
  ButtonText,
  IconWrapper,
  ButtonIcon,
};
