import styled from 'styled-components/native';
import ActionSheet from 'react-native-actions-sheet';
import {View} from 'react-native';
import {Button} from '@ui-kitten/components';

import {Icon} from '@ui-kitten/components';
import RangeSlider from 'rn-range-slider';
import {animated} from 'react-spring';

import {colors} from '../../themes/variables';
import {sanFranciscoWeights} from 'react-native-typography';

const AnimatedView = animated(View);

const Container = styled.View`
  padding: 20px;
`;

const StyledAnimatedView = styled(AnimatedView)`
  padding: 20px;
  position: absolute;
  z-index: 999;
  background-color: white;
  width: 100%;
  height: 100%;
  top: 50;
`;

const TopContainer = styled.View`
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  padding: 10px 20px;
`;

const CategoryTitle = styled.Text`
  ${sanFranciscoWeights.bold};
  font-size: 22px;
  width: 80%;
`;

const TopIconContainer = styled.View`
  flex-direction: row;
  justify-content: space-around;
  width: 20%;
`;

const FilterIcon = styled(Icon)`
  ${sanFranciscoWeights.bold};
  height: 20px;
  width: 30px;
`;

const OrderIcon = styled(Icon)`
  ${sanFranciscoWeights.bold};
  height: 20px;
  width: 30px;
`;

const Wrapper = styled.View`
  background-color: ${colors.white};
`;

const SelectContainer = styled.View`
  padding: 0px 20px;
`;

const RangeContainer = styled.View`
  align-items: center;
  flex-direction: row;
  justify-content: center;
  padding: 0px 20px;
`;

const RangeTitle = styled.Text`
  ${sanFranciscoWeights.bold};
  font-size: 12px;
  margin-right: 5px;
`;

const StyledRangeSlider = styled(RangeSlider)`
  width: 160;
  height: 80;
`;

const ProductCardContainer = styled.View`
  width: 50%;
  height: 300px;
  display: flex;
`;

const ModalWrapper = styled.ScrollView`
  padding: 0px 20px;
`;

const StyledActionSheet = styled(ActionSheet)`
  padding: 20px;
`;

const ClearFilterButton = styled(Button)`
  margin: 20px 0px 80px 0px;
`;

export const Styled = {
  Container,
  Wrapper,
  CategoryTitle,
  TopContainer,
  FilterIcon,
  SelectContainer,
  RangeContainer,
  RangeTitle,
  OrderIcon,
  TopIconContainer,
  StyledRangeSlider,
  ProductCardContainer,
  StyledAnimatedView,
  StyledActionSheet,
  ModalWrapper,
  ClearFilterButton,
};
