import React, {useContext, useEffect, useState} from 'react';
import _ from 'lodash';

import PriceWithCurrency from '../../Common/PriceWithCurrency/PriceWithCurrency';
import {priceWithTax} from '../../../utils/functions';
import AppContext from '../../../context/AppContext';
import CheckoutContext from '../../../context/CheckoutContext';

import {Styled} from './styles';

export default function CartTotalPrice() {
	const {userCart, cartCount} = useContext(AppContext);
	const {selectedShippingMethod} = useContext(CheckoutContext);
	const [totalPrice, setTotalPrice] = useState(null);
	const [totalWithoutPrice, setTotalWithoutPrice] = useState(null);

	useEffect(() => {
		let total = 0;
		let totalWithout = 0;

		_.forEach(userCart, function (product) {
			const price = priceWithTax(
				product.mainDetail.prices[0].price.toFixed(2),
				product.tax.tax
			);
			total += price * product.quantity;
			const prcWithTax = priceWithTax(
				product.mainDetail.prices[0].price.toFixed(2)
			);
			totalWithout += prcWithTax * product.quantity;
		});

		setTotalPrice(total);
		setTotalWithoutPrice(totalWithout);
	}, [userCart, cartCount]);

	const shippingPrice =
		selectedShippingMethod && parseInt(selectedShippingMethod.detail.value);

	return (
		<Styled.CardContainer>
			<Styled.TextContainer row>
				<Styled.TextLeft>Items{` ( ${cartCount} )`}</Styled.TextLeft>
				<Styled.CurrencyContainer row>
					<Styled.TextRight marginL-5>
						<PriceWithCurrency price={totalWithoutPrice} />
					</Styled.TextRight>
				</Styled.CurrencyContainer>
			</Styled.TextContainer>
			{selectedShippingMethod && (
				<Styled.TextContainer row>
					<Styled.TextLeft>Shipping costs</Styled.TextLeft>
					<Styled.CurrencyContainer row>
						<PriceWithCurrency price={shippingPrice} />
					</Styled.CurrencyContainer>
				</Styled.TextContainer>
			)}
			<Styled.TextContainer row>
				<Styled.TextLeft>Tax</Styled.TextLeft>
				<Styled.CurrencyContainer row>
					<Styled.TextRight marginL-5>
						<PriceWithCurrency price={totalPrice - totalWithoutPrice} />
					</Styled.TextRight>
				</Styled.CurrencyContainer>
			</Styled.TextContainer>
			<Styled.TextContainer row marginT-20 bordered>
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
			</Styled.TextContainer>
		</Styled.CardContainer>
	);
}
