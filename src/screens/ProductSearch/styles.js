import styled from 'styled-components/native';
import {colors} from '../../themes/variables';
import {sanFranciscoWeights} from 'react-native-typography';

const Container = styled.View`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  min-height: 240px;
`;

const CardRow = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  background-color: red;
  height: 200px;
`;

const CardContainer = styled.View`
  width: 50%;
  display: flex;
  background-color: green;
`;

const CategoryTitle = styled.Text`
  color: ${colors.themeColor};
  font-size: 18px;
  font-weight: bold;
  margin-left: 10px;
  ${sanFranciscoWeights.bold};
`;

const ScreenTitle = styled.Text`
  color: ${colors.blue};
  font-size: 18px;
  ${sanFranciscoWeights.bold};
  margin-bottom: 10px;
`;

export const Styled = {
  CategoryTitle,
  Container,
  ScreenTitle,
  CardContainer,
  CardRow,
};
