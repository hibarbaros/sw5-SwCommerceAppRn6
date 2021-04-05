import React, {useContext} from 'react';
import _ from 'lodash';

import PriceWithCurrency from '../PriceWithCurrency';
import CheckoutContext from '../../../context/CheckoutContext';
import {useProductByVariant} from '../../../utils/hooks/useProduct';

import {Styled} from './styles';

export default function CartTotalPrice({userCart}) {
  const {selectedShippingMethod} = useContext(CheckoutContext);
  let netPrice = 0;

  userCart.forEach((cartProduct) => {
    const {data} = useProductByVariant(cartProduct.variantId);
    if (data) {
      const [price] = data.prices;
      netPrice += price.price * cartProduct.quantity;
    }
  });

  return (
    <Styled.CardContainer>
      <Styled.TextContainer row>
        <Styled.CurrencyContainer row>
          <Styled.TextRight marginL-5>
            <PriceWithCurrency price={netPrice} />
          </Styled.TextRight>
        </Styled.CurrencyContainer>
      </Styled.TextContainer>
      <Styled.TextContainer row>
        <Styled.TextLeft>Total Price</Styled.TextLeft>
        <Styled.CurrencyContainer row>
          <Styled.TextRight marginL-5>
            <PriceWithCurrency price={netPrice} />
          </Styled.TextRight>
        </Styled.CurrencyContainer>
      </Styled.TextContainer>
      {selectedShippingMethod && (
        <Styled.TextContainer row>
          <Styled.TextLeft>Shipping costs</Styled.TextLeft>
          <Styled.CurrencyContainer row>
            <PriceWithCurrency price={selectedShippingMethod.detail.value} />
          </Styled.CurrencyContainer>
        </Styled.TextContainer>
      )}
      <Styled.TextContainer row>
        <Styled.TextLeft>Tax</Styled.TextLeft>
        <Styled.CurrencyContainer row>
          <Styled.TextRight marginL-5>
            <PriceWithCurrency price={netPrice / 19} />
          </Styled.TextRight>
        </Styled.CurrencyContainer>
      </Styled.TextContainer>
      <Styled.TextContainer row marginT-20 bordered>
        <Styled.TextLeft total>Total Price</Styled.TextLeft>
        <Styled.CurrencyContainer row>
          <Styled.TextRight marginL-5>
            <PriceWithCurrency price={netPrice * 1.19} />
          </Styled.TextRight>
        </Styled.CurrencyContainer>
      </Styled.TextContainer>
    </Styled.CardContainer>
  );
}
