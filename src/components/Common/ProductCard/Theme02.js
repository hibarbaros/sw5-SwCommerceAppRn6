import React from 'react';

import PriceWithCurrency from '../PriceWithCurrency';
import ProductCardMedia from '../../ProductComponents/ProductCardMedia';
import AppRoutes from '../../../utils/approutes';

import {Headline} from '../../../themes/components';

import {Styled} from './theme02.styles';

export default function ProductCardTheme02({navigation, product, thumbnail}) {
  const [price] = product.mainDetail.prices;
  return (
    <Styled.Card
      onPress={() => {
        navigation.navigate(AppRoutes.PRODUCT_DETAIL, {
          productId: product.id,
        });
      }}>
      <Styled.ImageContainer>
        {thumbnail && <ProductCardMedia thumbnail={thumbnail} />}
      </Styled.ImageContainer>
      <Headline
        variant="secondarytext"
        color="dark"
        fontSize="xl"
        numberOfLines={2}>
        {product.name}
      </Headline>
      <Styled.CurrencyContainer>
        <PriceWithCurrency price={price?.price} product={product} />
      </Styled.CurrencyContainer>
    </Styled.Card>
  );
}
