import React from 'react';
import {Div, Text} from 'react-native-magnus';

import Media from '../Media/Media';
import PriceWithCurrency from '../PriceWithCurrency';
import {ButtonIcon} from '../../../themes/components';
import {colors} from '../../../themes/variables';
import {useProductByProductId} from '../../../utils/hooks/useProduct';
import {useAddToCart, useRemoveToCart} from '../../../utils/hooks/useCart';

import {Styled} from './styles';

export default function CartBox({product}) {
  const {data: productData, isLoading} = useProductByProductId(product.id);
  const {mutate: mutateAddToCart, isLoading: mutateLoading} = useAddToCart();
  const {mutate: mutateRemoveToCart} = useRemoveToCart();

  if (isLoading) {
    return null;
  }

  function handleUserCart(value) {
    const mutateVariables = {
      productData,
      quantity: value,
    };
    mutateVariables.productData.number = product.number;
    mutateAddToCart(mutateVariables);
  }

  function handleRemoveProducttoCart() {
    mutateRemoveToCart(product.number);
  }

  const productVariantData = productData.details?.filter(
    (x) => x.number === product.number,
  );

  const [variantDetail] = productVariantData;

  return (
    <Styled.CardContainer>
      <Div row>
        <Div w={80} h={80}>
          {productData.images[0].mediaId && (
            <Media borderRadius={8} thumbnail={productData.images[0]} />
          )}
        </Div>
        <Div>
          <Div mx={10}>
            <Text>{productData.name}</Text>
            <Text>{variantDetail.number}</Text>
            <PriceWithCurrency
              price={productData.mainDetail.prices[0].price}
              product={productData}
            />
          </Div>
          {variantDetail.configuratorOptions.length > 0 && (
            <Div>
              <Text>Variant</Text>
              {variantDetail.configuratorOptions.map((variant) => (
                <Div key={variant.name}>
                  <Text>{variant.name}</Text>
                </Div>
              ))}
            </Div>
          )}
        </Div>
      </Div>
      <Div row my={10} justifyContent="flex-end">
        <ButtonIcon
          iconName="trash"
          iconSize={22}
          bordered={false}
          iconColor={colors.blue}
          onPress={() => handleRemoveProducttoCart()}
        />
        <Styled.SimpleStepper
          showText
          disabled={mutateLoading}
          minimumValue={1}
          initialValue={parseInt(product.quantity, 10)}
          onIncrement={() => handleUserCart(+1)}
          onDecrement={() => handleUserCart(-1)}
        />
      </Div>
    </Styled.CardContainer>
  );
}
