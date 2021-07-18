import styled from 'styled-components/native';
import {View, Text} from 'react-native-ui-lib';
import {sanFranciscoWeights} from 'react-native-typography';

import {colors} from 'themes/variables';

const CardContainer = styled.TouchableOpacity`
  border-color: ${colors.neutralLight};
  border-radius: 8px;
  border-width: 1px;
  padding: 10px;
  margin-bottom: 10px;
`;

const ProductName = styled(Text)`
  color: ${colors.themeColor};
  font-size: 12px;
  font-weight: bold;
  ${sanFranciscoWeights.bold};
  width: 100px;
`;

const TextContainer = styled(View)`
  align-items: flex-start;
  display: flex;
  flex: 1;
  flex-direction: column;
  margin-bottom: 10px;
  margin-left: 10px;
`;

const RightContainer = styled(View)`
  flex: 1;
  flex-direction: row;
  margin-bottom: 10px;
`;

const ImageContainer = styled(View)`
  height: 80px;
  width: 80px;
`;

export const Styled = {
  CardContainer,
  TextContainer,
  ProductName,
  RightContainer,
  ImageContainer,
};
