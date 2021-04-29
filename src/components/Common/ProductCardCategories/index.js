import React from 'react';
import {useNavigation} from '@react-navigation/native';

import Theme01 from '../ProductCardThemes/Theme01';
import Theme02 from '../ProductCardThemes/Theme02';
import Theme03 from '../ProductCardThemes/Theme03';

export const themes = {
  theme01: Theme01,
  theme02: Theme02,
  theme03: Theme03,
};

const ProductCardCategories = ({product, theme = 'theme01'}) => {
  const navigation = useNavigation();
  const Theme = themes[theme];

  const thumbnail = product?.images.find((x) => x.main === '1');
  thumbnail.path = thumbnail.img;

  return (
    <Theme navigation={navigation} product={product} thumbnail={thumbnail} />
  );
};

export default ProductCardCategories;
