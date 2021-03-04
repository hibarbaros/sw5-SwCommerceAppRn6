import React, {useRef, useState} from 'react';
import {ActivityIndicator} from 'react-native';
import {View, Text} from 'react-native-ui-lib';
import Carousel from 'react-native-snap-carousel';
import {useQuery} from 'react-query';

import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {getReferenceFromFirebase} from '../../../utils/actions/firebaseactions';
import {GlobalStyled} from '../../../themes/styled/GlobalStyled';

import {Styled} from './styles';

export default function HomeMainCarousel() {
  const snapCarousel = useRef(null);
  const [carouselIndex, setCarouselIndex] = useState(0);

  const {isLoading, data: homepageBannerData} = useQuery('homepageBanner', () =>
    getReferenceFromFirebase('homepageBanner'),
  );

  if (isLoading) {
    return (
      <Styled.LoadingContainer>
        <Text>'Loading...'</Text>
      </Styled.LoadingContainer>
    );
  }

  const renderCarouselItem = (data) => {
    return (
      <Styled.StyledAnimatedImage
        source={{uri: data.item.url}}
        loader={<ActivityIndicator />}
        key={data.index}
        animationDuration={data.index === 0 ? 300 : 800}
      />
    );
  };

  const handleIndexChange = (index) => {
    setCarouselIndex(index);
  };

  return (
    <>
      <View flex>
        <Carousel
          activeSlideAlignment={'start'}
          ref={snapCarousel}
          data={homepageBannerData}
          renderItem={renderCarouselItem}
          onBeforeSnapToItem={handleIndexChange}
          onSnapToIndex={(index) => handleIndexChange(index)}
          firstItem={0}
          sliderWidth={wp('100%')}
          itemWidth={wp('100%')}
          layout={'default'}
        />
      </View>
      <View flex row marginH-s5>
        {homepageBannerData.map((element, i) => {
          return (
            <GlobalStyled.Bullet
              key={i}
              selected={carouselIndex === i ? true : false}
            />
          );
        })}
      </View>
    </>
  );
}
