import React, {useState, useContext, useEffect} from 'react';
import {Div, Text} from 'react-native-magnus';

import Media from '../Media/Media';
import PriceWithCurrency from '../PriceWithCurrency';
import {ButtonIcon} from '../../../themes/components';
import {colors} from '../../../themes/variables';
import AppContext from '../../../context/AppContext';
import {useProductByProductId} from '../../../utils/hooks/useProduct';

import {Styled} from './styles';

export default function CartBox({productId, quantity, wizard = false}) {
  const {userCart, cartActions} = useContext(AppContext);
  const [initialQuantity, setInitialQuantity] = useState(quantity);

  const {data: product, isLoading} = useProductByProductId(productId);

  if (isLoading) {
    return null;
  }

  function handleUserCart(e) {
    setInitialQuantity(e);
  }

  function handleRemoveProducttoCart() {
    cartActions.removeToCart(product.id);
  }

  // useEffect(() => {
  //   userCart.forEach((element, index) => {
  //     if (element.id === product.id) {
  //       userCart[index].quantity = initialQuantity;
  //     }
  //   });
  //   cartActions.setCart(userCart);
  //   cartActions._setCartCount(initialQuantity);
  // }, [initialQuantity]);

  useEffect(() => {
    setInitialQuantity(product.quantity);
  }, [userCart]);

  return (
    <Styled.CardContainer>
      <Div flexDir="row">
        <Div w={80} h={80}>
          {product.images[0].mediaId && (
            <Media borderRadius={8} thumbnail={product.images[0]} />
          )}
        </Div>
        <Div flexDir="column">
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
        <Div flexDir="row" my={10} justifyContent="flex-end">
          <ButtonIcon
            iconName="trash"
            iconSize={22}
            bordered={false}
            iconColor={colors.blue}
            onPress={() => handleRemoveProducttoCart()}
          />
          {initialQuantity && (
            <Styled.SimpleStepper
              showText={true}
              minimumValue={1}
              initialValue={initialQuantity}
              valueChanged={(value) => handleUserCart(value)}
            />
          )}
        </Div>
      )}
    </Styled.CardContainer>
  );
}
