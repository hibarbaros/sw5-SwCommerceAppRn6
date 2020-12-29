import React from 'react';
import {Text} from 'react-native';

import PriceWithCurrency from '../PriceWithCurrency/PriceWithCurrency';
import ProductCardMedia from '../../ProductComponents/ProductCardMedia/ProductCardMedia';

import {useProductByProductId} from '../../../utils/hooks/useProduct';

import {Styled} from './styles';

export default function ProductCardOrderDetail({product}) {
  const {isLoading, error, data: ProductCardMiniData} = useProductByProductId(
    product.articleId,
  );

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>{error.message}</Text>;
  }

  let cardProduct = ProductCardMiniData;
  if (cardProduct.mainDetail.number !== product.articleNumber) {
    const finded = cardProduct.details.find(
      (x) => x.number === product.articleNumber,
    );
    cardProduct.variants = finded.configuratorOptions;
  }

  const thumbnail = ProductCardMiniData.images.find((x) => x.main === 1)
    .mediaId;

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
