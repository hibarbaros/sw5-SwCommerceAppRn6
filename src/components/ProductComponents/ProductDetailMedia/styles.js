import styled from 'styled-components/native';
import SwiperFlatList from 'react-native-swiper-flatlist';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

const MediaContainer = styled.View`
  width: ${wp('100%')}px;
  justify-content: center;
`;

const StyledSwiperFlatList = styled(SwiperFlatList).attrs({
  paginationStyle: {
    marginBottom: 40,
  },
})``;

export const Styled = {
  MediaContainer,
  StyledSwiperFlatList,
};
