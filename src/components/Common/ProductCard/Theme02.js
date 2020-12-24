import React from 'react';
import PriceWithCurrency from '../PriceWithCurrency/PriceWithCurrency';
import ProductCardMedia from '../../ProductComponents/ProductCardMedia/ProductCardMedia';
import AppRoutes from '../../../utils/approutes';

import {Styled} from './theme02.styles';

export default function ProductCardTheme02({navigation, product, thumbnail}) {
	return (
		<Styled.Card
			onPress={() => {
				navigation.navigate(AppRoutes.PRODUCT_DETAIL, {
					productData: {product},
				});
			}}>
			<Styled.CardContainer>
				{thumbnail && (
					<Styled.ImageContainer>
						<ProductCardMedia mediaId={thumbnail.mediaId} />
					</Styled.ImageContainer>
				)}
				<Styled.ProductName numberOfLines={2}>
					{product.name}
				</Styled.ProductName>
				{product.mainDetail.prices.map((price, index) => {
					return (
						<Styled.CurrencyContainer key={index}>
							<PriceWithCurrency
								fontcolor="green"
								fontsize={18}
								price={price.price}
								product={product}
							/>
						</Styled.CurrencyContainer>
					);
				})}
			</Styled.CardContainer>
		</Styled.Card>
	);
}
