import React from 'react';
import PriceWithCurrency from '../PriceWithCurrency';
import ProductCardMedia from '../../ProductComponents/ProductCardMedia';
import AppRoutes from '../../../utils/approutes';

import {Styled} from './theme01.styles';

export default function Theme01({navigation, product, thumbnail}) {
  const [price] = product.mainDetail.prices;
  return (
    <Styled.Card
      onPress={() => {
        navigation.navigate(AppRoutes.PRODUCT_DETAIL, {
          productId: product.id,
        });
      }}>
      <ProductCardMedia thumbnail={thumbnail} />
      <Styled.ContentWrapper>
        <Styled.ProductName numberOfLines={2}>
          {product.name}
        </Styled.ProductName>
        <Styled.CurrencyContainer>
          <PriceWithCurrency price={price.price} product={product} />
        </Styled.CurrencyContainer>
      </Styled.ContentWrapper>
    </Styled.Card>
  );
}
