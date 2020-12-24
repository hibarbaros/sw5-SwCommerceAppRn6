import React, {useRef} from 'react';
import {Text} from 'react-native-ui-lib';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import _ from 'lodash';

import {useProducstByCategoryId} from '../../../utils/hooks/useProduct';
import ProductCard from '../../Common/ProductCard/ProductCard';

import {Styled} from './styles';

export default function CategoryProducts({categoryId}) {
	const snapCarousel = useRef(null);

	const {isLoading, data: categoryProductsData} = useProducstByCategoryId(
		categoryId
	);

	const renderCarouselItem = ({item}) => {
		return <ProductCard theme="theme03" productId={item.articleID} />;
	};

	if (isLoading) return <Text>'Loading...'</Text>;

	const takeProducts = _.take(categoryProductsData, 5);
	console.log('takeProducts', takeProducts);

	return (
		<Styled.StyledCarousel
			activeSlideAlignment={'start'}
			ref={snapCarousel}
			data={takeProducts}
			renderItem={renderCarouselItem}
			firstItem={0}
			inactiveSlideScale={1}
			inactiveSlideOpacity={1}
			sliderWidth={wp('100%')}
			itemWidth={wp('40%')}
			enableSnap={false}
			lockScrollWhileSnapping={true}
		/>
	);
}
