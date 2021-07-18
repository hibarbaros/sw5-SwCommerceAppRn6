import React from 'react';

import PriceWithCurrency from '../PriceWithCurrency';
import ProductCardMedia from 'components/ProductComponents/ProductCardMedia';

import {useProductByProductId} from 'utils/hooks/useProduct';

import {Styled} from './styles';

export default function ProductCardOrderDetail({product}) {
  const {isLoading, data} = useProductByProductId(product.articleId);

  if (isLoading) {
    return null;
  }

  let cardProduct = data;
  if (cardProduct.mainDetail.number !== product.articleNumber) {
    const finded = cardProduct.details.find(
      (x) => x.number === product.articleNumber,
    );
    cardProduct.variants = finded.configuratorOptions;
  }

  const thumbnail = data.images.find((x) => x.main === 1).mediaId;

  return (
    <Styled.CardContainer>
      <Styled.CardImage>
        {thumbnail && <ProductCardMedia mediaId={thumbnail} />}
      </Styled.CardImage>
      <Styled.TextContainer>
        <Styled.CardTitle>{cardProduct.name}</Styled.CardTitle>
        {cardProduct.variants &&
          cardProduct.variants.map((variant) => {
            return (
              <Styled.VariantTitle key={variant.name}>
                {variant.name}
              </Styled.VariantTitle>
            );
          })}
        {cardProduct.mainDetail.prices.map((price) => {
          return (
            <React.Fragment key={price.id}>
              <PriceWithCurrency price={price.price} product={cardProduct} />
            </React.Fragment>
          );
        })}
      </Styled.TextContainer>
    </Styled.CardContainer>
  );
}
