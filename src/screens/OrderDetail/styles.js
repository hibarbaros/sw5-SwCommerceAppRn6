import styled from 'styled-components/native';
import {colors} from '../../themes/variables';
import {Text, View} from 'react-native-ui-lib';
import {sanFranciscoWeights} from 'react-native-typography';

const DetailCard = styled.View`
  background-color: white;
  border: 1px solid ${colors.light};
  border-radius: 6px;
  flex: 1;
  margin-bottom: 20px;
  padding: 20px;
`;

const TextContainer = styled.View`
  display: flex;
  flex-direction: row;
  margin-bottom: 15px;
  width: 100%;
`;

const AddressContainer = styled.View`
  display: flex;
  flex-direction: column;
  margin-left: auto;
`;

const TextRight = styled(Text)`
  margin-left: auto;
  ${sanFranciscoWeights.medium};
`;

const TextLeft = styled(Text)`
  align-self: flex-start;
  ${sanFranciscoWeights.thin};
`;

const Title = styled(Text)`
  ${sanFranciscoWeights.bold};
  margin-bottom: 10px;
`;

const CurrencyContainer = styled.View`
  flex-direction: row;
  margin-left: auto;
`;

const ProductCardContainer = styled(View)``;

export const Styled = {
  DetailCard,
  TextContainer,
  TextRight,
  TextLeft,
  Title,
  AddressContainer,
  CurrencyContainer,
  ProductCardContainer,
};
