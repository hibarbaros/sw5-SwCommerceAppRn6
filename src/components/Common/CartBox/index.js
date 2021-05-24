import React from 'react';
import {Div, Text} from 'react-native-magnus';
//*components
import Media from '../Media/Media';
import PriceWithCurrency from '../PriceWithCurrency';
import {Button, Headline} from '../../../themes/components';
//*utils
import {useProductByProductId} from '../../../utils/hooks/useProduct';
import {useAddToCart, useRemoveToCart} from '../../../utils/hooks/useCart';

import {SimpleStepper} from './styles';

export default function CartBox({product}) {
  const {data: productData, isLoading} = useProductByProductId(product.id);
  const {mutate: mutateAddToCart, isLoading: mutateLoading} = useAddToCart();
  const {
    mutate: mutateRemoveToCart,
    isLoading: removeLoading,
  } = useRemoveToCart();

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

  const cardOpacity = removeLoading ? 0.2 : 1;

  return (
    <Div
      row
      opacity={cardOpacity}
      borderColor="light"
      borderRadius={5}
      borderWidth={1}
      my={10}
      py={10}
      px={5}>
      <Div w="30%" h={100}>
        {productData.images[0].mediaId && (
          <Media borderRadius={8} thumbnail={productData.images[0]} />
        )}
      </Div>
      <Div w="70%" h={100} pl={10}>
        <Div row>
          <Div w="70%">
            <Headline variant="primarytext" bold>
              {productData.name}
            </Headline>
            <Text>{variantDetail.number}</Text>
            {variantDetail.configuratorOptions.length > 0 && (
              <>
                <Headline mt={10} variant="primarytext">
                  Variant
                </Headline>
                {variantDetail.configuratorOptions.map((variant) => (
                  <Div key={variant.name}>
                    <Headline variant="primarytext" bold>
                      {variant.name}
                    </Headline>
                  </Div>
                ))}
              </>
            )}
          </Div>
          <Div w="30%">
            <Button
              ml="auto"
              suffix="trash"
              variant="red"
              onPress={() => handleRemoveProducttoCart()}
            />
          </Div>
        </Div>

        <Div row mt="auto" justifyContent="space-between" alignItems="flex-end">
          <PriceWithCurrency
            color="primary"
            price={productData.mainDetail.prices[0].price}
            product={productData}
          />
          <SimpleStepper
            showText
            disabled={mutateLoading}
            minimumValue={1}
            initialValue={parseInt(product.quantity, 10)}
            onIncrement={() => handleUserCart(+1)}
            onDecrement={() => handleUserCart(-1)}
          />
        </Div>
      </Div>
    </Div>
  );
}
