import React from 'react';
import styled from 'styled-components/native';

import ProductCard from '../ProductCard';

export default function Carousel({ data, cardTheme }) {
  const renderCarouselItem = ({ item }) => {
    return <ProductCard theme={cardTheme} productId={item.id} product={item} />;
  };

  return (
    <>
      {data && (
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
      )}
    </>
  );
}

const StyledCarousel = styled.FlatList`
  width: 100%;
  height: 300px;
`;
