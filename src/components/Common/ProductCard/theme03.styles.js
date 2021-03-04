import styled from 'styled-components/native';
import {sanFranciscoWeights} from 'react-native-typography';

const Card = styled.TouchableOpacity`
  background-color: white;
  flex: 1;
  margin: 10px;
  padding-bottom: 20px;
`;

const CardContainer = styled.View`
  display: flex;
  flex-direction: column;
`;

const CurrencyContainer = styled.View`
  align-items: flex-start;
  bottom: 0px;
  margin-top: 10px;
`;

const ImageContainer = styled.View`
  border-radius: 6px;
  height: 160px;
  width: 160px;
  margin: 0px auto;
  overflow: hidden;
`;

const ProductName = styled.Text`
  font-size: 12px;
  line-height: 18px;
  margin-top: 10px;
  ${sanFranciscoWeights.light};
`;

export const Styled = {
  Card,
  ProductName,
  CardContainer,
  CurrencyContainer,
  ImageContainer,
};
