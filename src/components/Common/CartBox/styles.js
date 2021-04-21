import styled from 'styled-components/native';

import {SimpleStepper as unStyledSimpleStepper} from 'react-native-simple-stepper';
import {colors} from '../../../themes/variables';

export const SimpleStepper = styled(unStyledSimpleStepper).attrs({
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
    justifyContent: 'center',
    borderColor: colors.neutralLight,
    width: 100,
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
};
