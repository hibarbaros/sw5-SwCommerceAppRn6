import styled from 'styled-components/native';
import {View} from 'react-native-ui-lib';

import {SimpleStepper as unStyledSimpleStepper} from 'react-native-simple-stepper';
import {colors} from '../../../themes/variables';

const CardContainer = styled(View)`
  border-color: ${colors.neutralLight};
  border-radius: 8px;
  border-width: 1px;
  margin-bottom: 10px;
  padding: 20px;
`;

const ImageContainer = styled.View`
  height: 80px;
  width: 80px;
`;

const TextContainer = styled.View`
  padding-left: 10px;
  padding-right: 10px;
`;

const RightContainer = styled(View)`
  padding-left: 10px;
  padding-right: 10px;
  width: 30%;
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
    width: 100,
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
  CardContainer,
  ImageContainer,
  TextContainer,
  RightContainer,
  SimpleStepper,
};
