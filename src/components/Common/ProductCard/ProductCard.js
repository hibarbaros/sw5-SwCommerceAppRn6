import React from 'react';
import {Text} from 'react-native';
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

  const Theme = themes[theme];
  if (!Theme) {
    return null;
  }

  const {isLoading, error, data: productData} = useProductByProductId(
    productId,
  );

  if (isLoading) {
    return <Styled.Loader />;
  }

  if (error) {
    return <Text>An error has occurred: {error.message} </Text>;
  }

  const thumbnail = productData.images.find((x) => x.main === 1);

  return (
    <Theme
      navigation={navigation}
      product={productData}
      thumbnail={thumbnail}
    />
  );
};

export default ProductCard;
