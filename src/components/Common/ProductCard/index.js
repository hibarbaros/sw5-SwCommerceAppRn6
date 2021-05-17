import React from 'react';
import {useNavigation} from '@react-navigation/native';

import {useProductByProductId} from '../../../utils/hooks/useProduct';

import Theme01 from '../ProductCardThemes/Theme01';
import Theme02 from '../ProductCardThemes/Theme02';
import Theme03 from '../ProductCardThemes/Theme03';

export const themes = {
  theme01: Theme01,
  theme02: Theme02,
  theme03: Theme03,
};

const ProductCard = ({productId, theme = 'theme01'}) => {
  const navigation = useNavigation();

  const {isLoading, data} = useProductByProductId(productId);
  const Theme = themes[theme];

  if (isLoading) {
    return null;
  }

  const thumbnail = data?.images.find((x) => x.main === 1);

  return (
    data && (
      <Theme navigation={navigation} product={data} thumbnail={thumbnail} />
    )
  );
};

export default ProductCard;
