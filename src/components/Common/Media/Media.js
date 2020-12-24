import React from 'react';
import {ActivityIndicator} from 'react-native';
import {useQuery} from 'react-query';

import {mediaDetail} from '../../../utils/actions/mediaactions';

import {Styled} from './styles';

const Media = ({mediaId, borderRadius, resizeMode = 'cover'}) => {
	if (!mediaId) return null;
	const {isLoading, error, data: mediaData} = useQuery(
		['MediaData', mediaId],
		() => mediaDetail(mediaId)
	);

	if (isLoading)
		return (
			<Styled.Indicator>
				<ActivityIndicator />
			</Styled.Indicator>
		);

	if (error) return null;

	return (
		<>
			{mediaData && (
				<Styled.StyledImage
					source={{uri: mediaData.path}}
					borderRadius={borderRadius}
					resizeMode={resizeMode}
				/>
			)}
		</>
	);
};

export default Media;
