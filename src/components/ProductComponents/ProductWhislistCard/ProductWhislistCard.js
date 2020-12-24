import React, {useContext} from 'react';
import {View} from 'react-native-ui-lib';
import {useNavigation} from '@react-navigation/native';
import PriceWithCurrency from '../../../components/Common/PriceWithCurrency/PriceWithCurrency';
import Media from '../../../components/Common/Media/Media';
import {ButtonIcon} from '../../../themes/components';
import AppContext from '../../../context/AppContext';
import AppRoutes from '../../../utils/approutes';

import {Styled} from './styles';

export default function ProductWhislistCard({product}) {
	const {whislistActions} = useContext(AppContext);
	const navigation = useNavigation();

	function handleRemoveProducttoList() {
		whislistActions.removeToWish(product);
	}

	return (
		<Styled.CardContainer
			onPress={() => {
				navigation.navigate(AppRoutes.PRODUCT_DETAIL, {
					productData: {product},
				});
			}}>
			<View flex row centerV>
				<Styled.ImageContainer>
					<Media borderRadius={5} mediaId={product.images[0].mediaId} />
				</Styled.ImageContainer>
				<Styled.RightContainer>
					<Styled.TextContainer>
						<Styled.ProductName>{product.name} </Styled.ProductName>
						{product.mainDetail.prices.map((price, i) => {
							return (
								<View key={i}>
									<PriceWithCurrency price={price.price} product={product} />
								</View>
							);
						})}
					</Styled.TextContainer>
					<View centerV>
						<ButtonIcon iconName="trash" onPress={handleRemoveProducttoList} />
					</View>
				</Styled.RightContainer>
			</View>
		</Styled.CardContainer>
	);
}
