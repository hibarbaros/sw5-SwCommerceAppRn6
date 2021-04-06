import styled from 'styled-components';
import {sanFranciscoWeights} from 'react-native-typography';

import {Text, View} from 'react-native-ui-lib';
import {colors} from '../../themes/variables';

const Container = styled(View)`
  padding: 20px;
`;

const ListItem = styled(View)`
  display: flex;
  flex-direction: row;
  margin-bottom: 20px;
`;

const TextContainer = styled(View)`
  display: flex;
  flex-direction: column;
`;

const ListItemTitle = styled(Text)`
  color: ${colors.neutralGrey};
  ${sanFranciscoWeights.medium};
  font-size: 16px;
`;

const ListItemDesc = styled(Text)`
  color: ${colors.neutralGrey};
  ${sanFranciscoWeights.thin};
  font-size: 14px;
`;

const ListItemIcon = styled(View)`
  align-self: flex-end;
`;

export const Styled = {
  Container,
  ListItem,
  ListItemTitle,
  ListItemIcon,
  ListItemDesc,
  TextContainer,
};
