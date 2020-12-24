import React from 'react';
import PriceWithCurrency from '../PriceWithCurrency/PriceWithCurrency';
import ProductCardMedia from '../../ProductComponents/ProductCardMedia/ProductCardMedia';
import AppRoutes from '../../../utils/approutes';
import {View} from 'react-native-ui-lib';

import {Styled} from './theme01.styles';

export default function Theme01({navigation, product, thumbnail}) {
	return (
		<Styled.Card
			onPress={() => {
				navigation.navigate(AppRoutes.PRODUCT_DETAIL, {
					productData: {product},
				});
			}}>
			<View flex row>
				<View flex>
					{thumbnail && <ProductCardMedia mediaId={thumbnail.mediaId} />}
				</View>
				<Styled.ContentWrapper>
					<Styled.ProductName numberOfLines={2}>
						{product.name}
					</Styled.ProductName>
					{product.mainDetail.prices.map((price, index) => {
						return (
							<PriceWithCurrency
								key={index}
								fontcolor="red"
								fontsize={18}
								price={price.price}
								product={product}
							/>
						);
					})}
				</Styled.ContentWrapper>
			</View>
		</Styled.Card>
	);
}
