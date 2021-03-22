import styled from 'styled-components/native';
import {Text} from 'react-native';
import {sanFranciscoWeights} from 'react-native-typography';
import {SimpleStepper as unStyledSimpleStepper} from 'react-native-simple-stepper';

import {colors} from '../../themes/variables';

const ImageContainer = styled.View`
  height: 440px;
`;

const FavoriteIconContainer = styled.View`
  width: 20%;
  height: 40px;
`;

const TopContainer = styled.View`
  display: flex;
  flex-direction: row;
  margin-bottom: 20px;
`;

const TextContainer = styled.View`
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

const ProductPrice = styled.View`
  display: flex;
`;

const ShipContainer = styled.View`
  display: flex;
  margin-bottom: 30px;
`;

const ShipText = styled.Text`
  color: ${colors.green};
  ${sanFranciscoWeights.regular};
  margin-bottom: 10px;
`;

const DescriptionTitle = styled.Text`
  ${sanFranciscoWeights.bold};
  margin-bottom: 5px;
`;

const DescriptionText = styled.Text`
  ${sanFranciscoWeights.thin};
  line-height: 22px;
`;

const DescriptionContainer = styled.View`
  margin-bottom: 20px;
`;

const CategoryContainer = styled.View`
  margin-bottom: 20px;
`;

const GeneralText = styled.Text`
  ${sanFranciscoWeights.thin};
`;

const Wrapper = styled.View`
  background-color: white;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  box-shadow: 0px -20px 8px rgba(0, 0, 0, 0.2);
  padding: 20px 20px 0px 20px;
  top: -30px;
`;

const StyledSafeView = styled.View`
  background-color: ${(props) =>
    props.noStock ? colors.red : colors.themeColor};
`;

const NoStockText = styled.Text`
  color: ${colors.white};
  text-align: center;
  margin-top: 20px;
  font-weight: bold;
`;

const SimpleStepper = styled(unStyledSimpleStepper).attrs({
  textStyle: {
    fontSize: 14,
    width: 30,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  containerStyle: {
    flexDirection: 'row',
    borderWidth: 2,
    borderRadius: 4,
    overflow: 'hidden',
    alignItems: 'center',
    borderColor: colors.neutralLight,
    width: '100%',
    justifyContent: 'center',
  },
  incrementImageStyle: {
    height: 10,
    width: 10,
    justifyContent: 'center',
  },
  decrementImageStyle: {
    height: 10,
    width: 10,
    justifyContent: 'center',
  },
  separatorStyle: {
    borderColor: colors.neutralLight,
    borderWidth: 1,
    height: '100%',
  },
})`
  background: blue;
  color: red;
`;

export const Styled = {
  SimpleStepper,
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
  StyledSafeView,
  NoStockText,
};
