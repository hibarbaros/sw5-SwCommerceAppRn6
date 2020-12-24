import styled from 'styled-components/native';
import {Card} from '../../../themes/components';

import {colors} from '../../../themes/variables';

export const PaymentCard = styled(Card)`
  border-width: 1px;
  border-color: ${(props) => (props.selected ? 'transparent' : colors.gray3)};
  margin: 10px 0px;
  padding: 10px;
`;

export const Styled = {
  PaymentCard,
};
