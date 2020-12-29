import React, {useState, useContext, useEffect} from 'react';
import {View, Text} from 'react-native-ui-lib';
import Media from '../Media/Media';
import PriceWithCurrency from '../../Common/PriceWithCurrency/PriceWithCurrency';
import {ButtonIcon} from '../../../themes/components/';
import {colors} from '../../../themes/variables';
import AppContext from '../../../context/AppContext';

import {Styled} from './styles';

export default function CartBox({product, wizard = false}) {
  const {userCart, cartActions} = useContext(AppContext);
  const [initialQuantity, setInitialQuantity] = useState(product.quantity);

  function _handleUserCart(e) {
    setInitialQuantity(e);
  }

  function handleRemoveProducttoCart() {
    cartActions.removeToCart(product.id);
  }

  useEffect(() => {
    userCart.forEach((element, index) => {
      if (element.id === product.id) {
        userCart[index].quantity = initialQuantity;
      }
    });
    cartActions.setCart(userCart);
    cartActions._setCartCount(initialQuantity);
  }, [initialQuantity]);

  useEffect(() => {
    setInitialQuantity(product.quantity);
  }, [userCart]);

  return (
    <Styled.CardContainer>
      <View flex column>
        <View flex row>
          <Styled.ImageContainer>
            {product.images[0].mediaId && (
              <Media borderRadius={8} mediaId={product.images[0].mediaId} />
            )}
          </Styled.ImageContainer>
          <View flex column>
            <Styled.TextContainer>
              <Text>{product.name} </Text>
              {product.mainDetail.prices.map((price) => {
                return (
                  <View key={price.id}>
                    <PriceWithCurrency price={price.price} product={product} />
                  </View>
                );
              })}
            </Styled.TextContainer>
            <View>
              {product.variantProduct && (
                <>
                  <Text>Variant</Text>
                  {product.variantProduct.configuratorOptions.map((variant) => {
                    return (
                      <View key={variant.name}>
                        <Text text70BO>{variant.name}</Text>
                      </View>
                    );
                  })}
                </>
              )}
            </View>
          </View>
        </View>
        {!wizard && (
          <View row right centerV>
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
                valueChanged={(value) => _handleUserCart(value)}
              />
            )}
          </View>
        )}
      </View>
    </Styled.CardContainer>
  );
}
