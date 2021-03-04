import React from 'react';
import {ActivityIndicator} from 'react-native';
import FastImage from 'react-native-fast-image';

import {useMediaByMediaId} from '../../../utils/hooks/useMedia';
import {Styled} from './styles';

export default function ProductCardMedia({mediaId}) {
  const {isLoading, data} = useMediaByMediaId(mediaId);

  if (isLoading) {
    return (
      <Styled.Indicator>
        <ActivityIndicator />
      </Styled.Indicator>
    );
  }

  return (
    <>
      {data.path && (
        <Styled.MediaImage
          source={{
            uri: data.path,
            priority: FastImage.priority.normal,
          }}
          resizeMode={FastImage.resizeMode.contain}
        />
      )}
    </>
  );
}
