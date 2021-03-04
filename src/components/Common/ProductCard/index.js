import React from 'react';
import {useNavigation} from '@react-navigation/native';

import {useProductByProductId} from '../../../utils/hooks/useProduct';

import Theme01 from './Theme01';
import Theme02 from './Theme02';
import Theme03 from './Theme03';

import {Styled} from './styles';

export const themes = {
  theme01: Theme01,
  theme02: Theme02,
  theme03: Theme03,
};

const ProductCard = ({productId, theme}) => {
  const navigation = useNavigation();
  const {isLoading, data} = useProductByProductId(productId);

  const Theme = themes[theme];
  if (!Theme) {
    return null;
  }

  if (isLoading) {
    return <Styled.Loader />;
  }

  const thumbnail = data.images.find((x) => x.main === 1);

  return <Theme navigation={navigation} product={data} thumbnail={thumbnail} />;
};

export default ProductCard;
