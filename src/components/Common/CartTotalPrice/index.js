import React, {useContext} from 'react';

import PriceWithCurrency from '../PriceWithCurrency';
import CheckoutContext from '../../../context/CheckoutContext';
import {useUserCartTotalPrice} from '../../../utils/hooks/useCart';

import {Styled} from './styles';

export default function CartTotalPrice() {
  const {selectedShippingMethod} = useContext(CheckoutContext);

  const {data} = useUserCartTotalPrice();

  return (
    <Styled.CardContainer>
      <Styled.TextContainer row>
        <Styled.TextLeft>Summe</Styled.TextLeft>
        <Styled.CurrencyContainer row>
          <Styled.TextRight marginL-5>
            <PriceWithCurrency price={data?.netPrice} />
          </Styled.TextRight>
        </Styled.CurrencyContainer>
      </Styled.TextContainer>
      <Styled.TextContainer row>
        <Styled.TextLeft>Versandkosten</Styled.TextLeft>
        <Styled.CurrencyContainer row>
          <PriceWithCurrency
            price={
              selectedShippingMethod ? selectedShippingMethod.detail.value : 0
            }
          />
        </Styled.CurrencyContainer>
      </Styled.TextContainer>
      <Styled.TextContainer row>
        <Styled.TextLeft>Gesamtsumme</Styled.TextLeft>
        <Styled.CurrencyContainer row>
          <Styled.TextRight marginL-5>
            <PriceWithCurrency
              price={
                data?.netPrice +
                (selectedShippingMethod && selectedShippingMethod.detail.value)
              }
            />
          </Styled.TextRight>
        </Styled.CurrencyContainer>
      </Styled.TextContainer>
      <Styled.TextContainer row>
        <Styled.TextLeft>Tax</Styled.TextLeft>
        <Styled.CurrencyContainer row>
          <Styled.TextRight marginL-5>
            <PriceWithCurrency price={data?.taxPrice} />
          </Styled.TextRight>
        </Styled.CurrencyContainer>
      </Styled.TextContainer>
      <Styled.TextContainer row marginT-20 bordered>
        <Styled.TextLeft total>Total Price</Styled.TextLeft>
        <Styled.CurrencyContainer row>
          {/* <Styled.TextRight marginL-5>
            <PriceWithCurrency price={data?.netPrice + data?.withTaxPrice} />
          </Styled.TextRight> */}
        </Styled.CurrencyContainer>
      </Styled.TextContainer>
    </Styled.CardContainer>
  );
}
