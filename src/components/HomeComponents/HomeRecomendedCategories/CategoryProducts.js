import React from 'react';
import _ from 'lodash';

import {useProducstByCategoryId} from '../../../utils/hooks/useProduct';
import ProductCard from '../../Common/ProductCard';

import {Styled} from './styles';

export default function CategoryProducts({categoryId}) {
  const {isLoading, data} = useProducstByCategoryId(categoryId);

  const renderCarouselItem = ({item}) => {
    return <ProductCard theme="theme01" productId={item.id} />;
  };

  if (isLoading) {
    return null;
  }

  const takedData = _.take(data, 5);

  return (
    <Styled.StyledCarousel
      horizontal
      showsHorizontalScrollIndicator={false}
      automaticallyAdjustContentInsets={true}
      removeClippedSubviews={true}
      enableEmptySections={true}
      data={takedData}
      renderItem={(item) => renderCarouselItem(item)}
      keyExtractor={(item, index) => index.toString()}
    />
  );
}
