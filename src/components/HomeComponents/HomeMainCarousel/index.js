import React, {useState} from 'react';
import {Text, Div, Image} from 'react-native-magnus';
import styled from 'styled-components/native';

import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {useCollectionByCollectinName} from '../../../utils/hooks/useFirebase';

export default function HomeMainCarousel() {
  const [carouselIndex, setCarouselIndex] = useState(0);

  const {data, isLoading} = useCollectionByCollectinName(
    'images',
    'homepageBanner',
  );

  if (isLoading) {
    return <Text>'Loading...'</Text>;
  }

  const renderCarouselItem = (item) => (
    <Image
      h="100%"
      w={wp('100%')}
      source={{
        uri: item.item.url,
      }}
    />
  );

  const handleScrollEnd = (e) => {
    const offset = e.nativeEvent.contentOffset;
    const viewSize = e.nativeEvent.layoutMeasurement;
    let pageNum = Math.floor(offset.x / viewSize.width);
    setCarouselIndex(pageNum);
  };

  return (
    <>
      <Div>
        <StyledCarousel
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled={true}
          onMomentumScrollEnd={(e) => handleScrollEnd(e)}
          data={data}
          renderItem={(item) => renderCarouselItem(item)}
          keyExtractor={(item, index) => index.toString()}
        />
      </Div>
      <Div row mt={10}>
        {data.map((element, i) => (
          <Div
            key={i}
            h={20}
            w={20}
            mx={5}
            bg={carouselIndex === i ? 'red' : 'secondary'}
            rounded="xl"
          />
        ))}
      </Div>
    </>
  );
}

const StyledCarousel = styled.FlatList`
  width: 100%;
  height: 280px;
`;
