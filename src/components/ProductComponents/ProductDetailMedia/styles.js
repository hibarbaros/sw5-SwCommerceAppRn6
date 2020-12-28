import styled from 'styled-components/native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

const MediaContainer = styled.View`
  width: ${wp('100%')};
  justify-content: center;
`;

export const Styled = {
  MediaContainer,
};
