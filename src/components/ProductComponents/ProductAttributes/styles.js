import styled from 'styled-components/native';
import {Text} from '@ui-kitten/components';

import {fontFamilies, fontSizes} from '../../../themes/variables';

const AttibuteTitle = styled(Text)`
  font-family: ${fontFamilies.secondaryRegular};
  font-size: ${fontSizes.large};
  margin: 10px 0px;
`;

const CheckItemContainer = styled.View`
  margin: 5px 0px;
`;

export const Styled = {
  AttibuteTitle,
  CheckItemContainer,
};
