import React, {useRef, useState} from 'react';
import {ActivityIndicator} from 'react-native';
import {View, Text} from 'react-native-ui-lib';
import Carousel from 'react-native-snap-carousel';

import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {useCollectionByCollectinName} from '../../../utils/hooks/useFirebase';
import {GlobalStyled} from '../../../themes/styled/GlobalStyled';

import {Styled} from './styles';

export default function HomeMainCarousel() {
  const snapCarousel = useRef(null);
  const [carouselIndex, setCarouselIndex] = useState(0);

  const {data, isLoading} = useCollectionByCollectinName(
    'images',
    'homepageBanner',
  );

  if (isLoading) {
    return (
      <Styled.LoadingContainer>
        <Text>'Loading...'</Text>
      </Styled.LoadingContainer>
    );
  }

  const renderCarouselItem = (item) => {
    return (
      <Styled.StyledAnimatedImage
        source={{uri: item.item.url}}
        loader={<ActivityIndicator />}
        key={item.index}
        animationDuration={item.index === 0 ? 300 : 800}
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
          data={data}
          renderItem={renderCarouselItem}
          onBeforeSnapToItem={handleIndexChange}
          onSnapToIndex={(index) => handleIndexChange(index)}
          firstItem={0}
          sliderWidth="100%"
          itemWidth="100%"
          layout={'default'}
        />
      </View>
      <View flex row marginH-s5>
        {data.map((element, i) => {
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
