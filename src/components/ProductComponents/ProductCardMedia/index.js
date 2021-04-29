import React, {useState} from 'react';
import FastImage from 'react-native-fast-image';
import {Skeleton} from 'react-native-magnus';

import {Styled} from './styles';

import {makeImageUrl} from '../../../utils/functions';

export default function ProductCardMedia({thumbnail}) {
  const image = makeImageUrl(thumbnail);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading && <Skeleton.Box h="100%" w="100%" />}
      <Styled.MediaImage
        onLoadEnd={() => setIsLoading(false)}
        source={{
          uri: image,
          priority: FastImage.priority.high,
        }}
        resizeMode={FastImage.resizeMode.contain}
      />
    </>
  );
}
