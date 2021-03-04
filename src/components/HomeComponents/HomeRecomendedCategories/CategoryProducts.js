import React from 'react';
import _ from 'lodash';

import {useProducstByCategoryId} from '../../../utils/hooks/useProduct';
import ProductCard from '../../Common/ProductCard';

import {Styled} from './styles';

export default function CategoryProducts({categoryId}) {
  const {isLoading, data} = useProducstByCategoryId(categoryId);

  const renderCarouselItem = ({item}) => {
    return <ProductCard theme="theme02" productId={item.articleID} />;
  };

  if (isLoading) {
    return null;
  }

  return (
    <Styled.StyledCarousel
      horizontal
      showsHorizontalScrollIndicator={false}
      automaticallyAdjustContentInsets={true}
      removeClippedSubviews={true}
      enableEmptySections={true}
      data={_.take(data, 5)}
      renderItem={(item) => renderCarouselItem(item)}
      keyExtractor={(item, index) => index.toString()}
    />
  );
}
