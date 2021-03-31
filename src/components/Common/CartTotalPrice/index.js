import React, {useContext} from 'react';
import _ from 'lodash';

import PriceWithCurrency from '../PriceWithCurrency';
import AppContext from '../../../context/AppContext';
import CheckoutContext from '../../../context/CheckoutContext';

import {Styled} from './styles';

export default function CartTotalPrice({cart}) {
  const {cartCount} = useContext(AppContext);
  const {selectedShippingMethod} = useContext(CheckoutContext);

  const editedCart = cart.map((product) => ({
    netPrice: product.netPrice * product.quantity,
    price: product.price * product.quantity,
  }));

  const netPrice = _.sumBy(editedCart, 'netPrice');
  const totalPrice = _.sumBy(editedCart, 'price');

  return (
    <Styled.CardContainer>
      <Styled.TextContainer row>
        <Styled.TextLeft>Items{` ( ${cartCount} )`}</Styled.TextLeft>
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
            <PriceWithCurrency price={totalPrice} />
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
            <PriceWithCurrency price={totalPrice - netPrice} />
          </Styled.TextRight>
        </Styled.CurrencyContainer>
      </Styled.TextContainer>
      {/* <Styled.TextContainer row marginT-20 bordered>
        <Styled.TextLeft total>Total Price</Styled.TextLeft>
        <Styled.CurrencyContainer row>
          <Styled.TextRight marginL-5>
            <PriceWithCurrency
              price={
                selectedShippingMethod ? totalPrice + shippingPrice : totalPrice
              }
            />
          </Styled.TextRight>
        </Styled.CurrencyContainer>
      </Styled.TextContainer> */}
    </Styled.CardContainer>
  );
}
