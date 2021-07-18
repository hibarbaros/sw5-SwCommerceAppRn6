import styled from 'styled-components/native';
import {sanFranciscoWeights} from 'react-native-typography';
import {Button} from '@ui-kitten/components';

import {colors} from 'themes/variables';

const Card = styled.View`
  border-color: ${colors.blue};
  border-radius: 5px;
  border-width: 1px;
  margin-bottom: 15px;
  padding: 20px;
`;

const AddressTitle = styled.Text`
  color: ${colors.naturalDark};
  font-size: 18px;
  margin-bottom: 10px;
  ${sanFranciscoWeights.bold};
`;

const AddressText = styled.Text`
  color: ${colors.neutralGrey};
  font-size: 12px;
  ${sanFranciscoWeights.regular};
  margin-bottom: 10px;
`;

const InfoText = styled.Text`
  color: ${colors.naturalDark};
  font-size: 12px;
  ${sanFranciscoWeights.bold};
  margin-bottom: 10px;
`;
const ButtonsContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 90px;
`;

const EditButton = styled(Button)`
  margin-left: 10px;
`;

export const Styled = {
  AddressTitle,
  Card,
  AddressText,
  InfoText,
  ButtonsContainer,
  EditButton,
};
