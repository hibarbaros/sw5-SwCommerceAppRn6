import styled from 'styled-components/native';
import {Icon} from '@ui-kitten/components';
import {colors} from '../themes/variables';

const CartIcon = styled.View`
  align-items: center;
  background-color: ${colors.blue};
  border-radius: 10px;
  color: white;
  height: 20px;
  justify-content: center;
  position: absolute;
  right: 20px;
  top: 5px;
  width: 20px;
`;

const CartIconText = styled.Text`
  color: white;
`;

const StyledIcon = styled(Icon)`
  height: 32px;
  width: 32px;
`;

export const Styled = {
  CartIcon,
  CartIconText,
  StyledIcon,
};
