import React from 'react';
import styled from 'styled-components/native';

import {useCollectionByCollectinName} from '../../../utils/hooks/useFirebase';
import ProductCard from '../ProductCard';

export default function Carousel({cardTheme, collection, doc}) {
  const {isLoading, data} = useCollectionByCollectinName(collection, doc);

  if (isLoading) {
    return null;
  }
  const renderCarouselItem = ({item}) => {
    return <ProductCard theme={cardTheme} productId={item.id} product={item} />;
  };

  return (
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
  );
}

const StyledCarousel = styled.FlatList`
  width: 100%;
  height: 280px;
`;
