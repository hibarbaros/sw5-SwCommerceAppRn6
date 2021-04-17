import styled from 'styled-components/native';
import {colors} from '../../../themes/variables';
import {sanFranciscoWeights} from 'react-native-typography';

const Card = styled.TouchableOpacity`
  background-color: white;
  border: 1px solid ${colors.light};
  border-radius: 6px;
  min-width: 200px;
  max-width: 200px;
  margin: 5px;
  padding-bottom: 20px;
  display: flex;
  flex-direction: column;
`;

const CurrencyContainer = styled.View`
  align-items: flex-start;
  bottom: 0px;
  padding: 5px 15px;
`;

const ImageContainer = styled.View`
  border-radius: 20px;
  height: 160px;
  margin: 0px auto;
  margin-top: 10px;
  padding: 0px 10px;
  width: 100%;
`;

const MediaImage = styled.Image`
  height: 100%;
  width: 100%;
`;

const ProductName = styled.Text`
  font-size: 12px;
  margin-top: 5px;
  padding: 5px 15px;
  ${sanFranciscoWeights.bold};
`;

export const Styled = {
  Card,
  ProductName,
  CurrencyContainer,
  ImageContainer,
  MediaImage,
};
