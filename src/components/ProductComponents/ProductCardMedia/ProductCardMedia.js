import React from 'react';
import {ActivityIndicator} from 'react-native';
import FastImage from 'react-native-fast-image';

import {useMediaByMediaId} from '../../../utils/hooks/useMedia';
import {Styled} from './styles';

const ProductCardMedia = ({mediaId}) => {
	const {isLoading, error, data: mediaDetailData} = useMediaByMediaId(mediaId);

	if (isLoading)
		return (
			<Styled.Indicator>
				<ActivityIndicator />
			</Styled.Indicator>
		);

	if (error) return null;

	return (
		<>
			{mediaDetailData.path && (
				<Styled.MediaImage
					source={{
						uri: mediaDetailData.path,
						priority: FastImage.priority.normal,
					}}
					resizeMode={FastImage.resizeMode.contain}
				/>
			)}
		</>
	);
};

export default ProductCardMedia;
