import React, {useRef} from 'react';
import Carousel from 'react-native-snap-carousel';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import ProductCard from '../../Common/ProductCard/ProductCard';

export default function ProductDetailSimilarProducts({product}) {
	const snapCarousel = useRef(null);

	const renderCarouselItem = ({item}) => {
		return <ProductCard productId={item.id} theme="theme03" />;
	};
	return (
		<>
			{product.similar && (
				<Carousel
					activeSlideAlignment={'start'}
					ref={snapCarousel}
					data={product.similar}
					renderItem={renderCarouselItem}
					firstItem={0}
					sliderWidth={wp('100%')}
					itemWidth={wp('40%')}
					layout={'default'}
					inactiveSlideScale={1}
				/>
			)}
		</>
	);
}
