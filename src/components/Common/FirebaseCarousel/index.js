import React from 'react';
import styled from 'styled-components/native';
import {Div} from 'react-native-magnus';

import ProductCard from '../ProductCard';
import {Headline} from 'themes/components';

import {useCollectionByCollectinName} from 'utils/hooks/useFirebase';

export default function Carousel({cardTheme, collection, doc, title}) {
  const {isLoading, data} = useCollectionByCollectinName(collection, doc);

  if (isLoading) {
    return null;
  }

  const renderCarouselItem = ({item}) => {
    return (
      <Div maxW={200} minW={200}>
        <ProductCard theme={cardTheme} productId={item.id} product={item} />
      </Div>
    );
  };

  return (
    data && (
      <>
        <Headline variant="h1" my="md" ml={10}>
          {title}
        </Headline>
        <StyledCarousel
          horizontal
          showsHorizontalScrollIndicator={false}
          automaticallyAdjustContentInsets={true}
          removeClippedSubviews={true}
          enableEmptySections={true}
          data={data}
          renderItem={(item) => renderCarouselItem(item)}
          keyExtractor={(item, index) => index.toString()}
        />
      </>
    )
  );
}

const StyledCarousel = styled.FlatList`
  width: 100%;
  height: 280px;
`;
