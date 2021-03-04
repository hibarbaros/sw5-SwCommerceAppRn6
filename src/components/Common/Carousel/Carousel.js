import React from 'react';

import {useCollectionByCollectinName} from '../../../utils/hooks/useFirebase';
import ProductCard from '../ProductCard';

import {Styled} from './styles';

export default function Carousel({cardTheme, collection}) {
  const {data} = useCollectionByCollectinName(collection);

  const renderCarouselItem = ({item}) => {
    return <ProductCard theme={cardTheme} productId={item.id} product={item} />;
  };

  return (
    <>
      {data && (
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
      )}
    </>
  );
}
