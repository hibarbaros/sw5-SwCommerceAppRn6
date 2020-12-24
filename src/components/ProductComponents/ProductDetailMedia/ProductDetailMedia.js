import React from 'react';
import SwiperFlatList from 'react-native-swiper-flatlist';
import Media from '../../Common/Media/Media';

import {Styled} from './styles';

const ProductDetailMedia = ({images}) => {
	return (
		<>
			{images && (
				<SwiperFlatList index={0} showPagination>
					{images.map((image, index) => (
						<Styled.MediaContainer key={index}>
							<Media mediaId={image.mediaId} />
						</Styled.MediaContainer>
					))}
				</SwiperFlatList>
			)}
		</>
	);
};

export default ProductDetailMedia;
