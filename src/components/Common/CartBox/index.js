import React, {useState} from 'react';
import {Div, Text} from 'react-native-magnus';

import Media from '../Media/Media';
import PriceWithCurrency from '../PriceWithCurrency';
import {ButtonIcon} from '../../../themes/components';
import {colors} from '../../../themes/variables';
import {useProductByProductId} from '../../../utils/hooks/useProduct';
import {useAddToCart, useRemoveToCart} from '../../../utils/hooks/useCart';

import {Styled} from './styles';

export default function CartBox({productId, quantity, wizard = false}) {
  const [initialQuantity, setInitialQuantity] = useState(quantity);

  const {data: product, isLoading} = useProductByProductId(productId);
  const {mutate: addToCart, isLoading: mutateLoading} = useAddToCart();
  const {mutate: removeToCart} = useRemoveToCart();

  if (isLoading) {
    return null;
  }

  function handleUserCart(eventQuantity, isNeg = false) {
    const mutateVariables = {
      productData: product,
      quantity: isNeg ? -1 : 1,
    };
    addToCart(mutateVariables);
    setInitialQuantity(eventQuantity);
  }

  function handleRemoveProducttoCart() {
    const mutateVariables = {
      productData: product,
    };
    removeToCart(mutateVariables);
  }

  return (
    <Styled.CardContainer>
      <Div row>
        <Div w={80} h={80}>
          {product.images[0].mediaId && (
            <Media borderRadius={8} thumbnail={product.images[0]} />
          )}
        </Div>
        <Div>
          <Div mx={10}>
            <Text>{product.name}</Text>
            <PriceWithCurrency
              price={product.mainDetail.prices[0].price}
              product={product}
            />
          </Div>
          {product.variantProduct && (
            <Div>
              <Text>Variant</Text>
              {product.variantProduct.configuratorOptions.map((variant) => (
                <Div key={variant.name}>
                  <Text>{variant.name}</Text>
                </Div>
              ))}
            </Div>
          )}
        </Div>
      </Div>
      {!wizard && (
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
            initialValue={initialQuantity}
            onIncrement={(value) => handleUserCart(value)}
            onDecrement={(value) => handleUserCart(value, true)}
          />
        </Div>
      )}
    </Styled.CardContainer>
  );
}
