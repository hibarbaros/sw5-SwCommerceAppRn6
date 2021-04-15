import React from 'react';

import ProductCard from '../ProductCard';

import {Styled} from './styles';

export default function Carousel({data, cardTheme}) {
  const renderCarouselItem = ({item}) => {
    return <ProductCard theme={cardTheme} productId={item.id} product={item} />;
  };

  return (
    <Styled.StyledCarousel
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
