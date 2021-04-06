import styled from 'styled-components/native';
import {colors} from '../../../themes/variables';

const Loader = styled.View`
  background-color: ${colors.neutralLight};
  border: 1px solid ${colors.light};
  height: 200px;
  margin: 5%;
  width: 90%;
`;

export const Styled = {
  Loader,
};
