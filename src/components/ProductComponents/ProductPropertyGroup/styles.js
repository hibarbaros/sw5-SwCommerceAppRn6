import styled from 'styled-components/native';
import {View, Text} from 'react-native-ui-lib';
import {sanFranciscoWeights} from 'react-native-typography';

import {colors} from 'themes/variables';

const ImageContainer = styled(View)`
  height: 440px;
`;

const FavoriteIconContainer = styled(View)`
  width: 20%;
`;

const TopContainer = styled(View)`
  display: flex;
  flex-direction: row;
  margin-bottom: 20px;
`;

const TextContainer = styled(View)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 80%;
`;

const ProductName = styled(Text)`
  display: flex;
  ${sanFranciscoWeights.bold}
  font-size: 20px;
  margin-bottom: 10px;
`;

const ProductPrice = styled(View)`
  display: flex;
`;

const ShipContainer = styled(View)`
  display: flex;
  margin-bottom: 30px;
`;

const ShipText = styled(Text)`
  color: ${colors.green};
  ${sanFranciscoWeights.regular};
  margin-bottom: 10px;
`;

const DescriptionTitle = styled(Text)`
  ${sanFranciscoWeights.bold};
  margin-bottom: 5px;
`;

const DescriptionText = styled(Text)`
  ${sanFranciscoWeights.thin};
  line-height: 22px;
`;

const DescriptionContainer = styled(View)`
  margin-bottom: 20px;
`;

const CategoryContainer = styled(View)`
  margin-bottom: 20px;
`;

const GeneralText = styled(Text)`
  ${sanFranciscoWeights.thin};
`;

const Wrapper = styled(View)`
  background-color: white;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  box-shadow: 0px -20px 8px rgba(0, 0, 0, 0.2);
  padding: 20px 20px 0px 20px;
  top: -30px;
`;

export const Styled = {
  ImageContainer,
  FavoriteIconContainer,
  Wrapper,
  TopContainer,
  ProductName,
  TextContainer,
  ProductPrice,
  ShipContainer,
  ShipText,
  DescriptionContainer,
  DescriptionTitle,
  DescriptionText,
  CategoryContainer,
  GeneralText,
};
