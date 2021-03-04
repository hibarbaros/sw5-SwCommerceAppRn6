import React from 'react';
import PriceWithCurrency from '../PriceWithCurrency';
import ProductCardMedia from '../../ProductComponents/ProductCardMedia';
import AppRoutes from '../../../utils/approutes';

import {colors} from '../../../themes/variables';

import {Styled} from './theme03.styles';

export default function ProductCardTheme03({navigation, product, thumbnail}) {
  return (
    <Styled.Card
      onPress={() => {
        navigation.navigate(AppRoutes.PRODUCT_DETAIL, {
          productData: {product},
        });
      }}>
      <Styled.CardContainer>
        {thumbnail && (
          <Styled.ImageContainer>
            <ProductCardMedia mediaId={thumbnail.mediaId} />
          </Styled.ImageContainer>
        )}
        <Styled.ProductName numberOfLines={2}>
          {product.name}
        </Styled.ProductName>
        {product.mainDetail.prices.map((price, index) => (
          <Styled.CurrencyContainer key={index}>
            <PriceWithCurrency
              fontcolor={colors.themeColor}
              fontsize={14}
              price={price.price}
              product={product}
            />
          </Styled.CurrencyContainer>
        ))}
      </Styled.CardContainer>
    </Styled.Card>
  );
}
