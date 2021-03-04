import React from 'react';
import FastImage from 'react-native-fast-image';

import {Styled} from './styles';

import vars from '../../../utils/vars';

export default function ProductCardMedia({thumbnail}) {
  const image = `${vars.host}/media/image/${thumbnail.path}.${thumbnail.extension}`;

  return (
    <Styled.MediaImage
      source={{
        uri: image,
        priority: FastImage.priority.normal,
      }}
      resizeMode={FastImage.resizeMode.contain}
    />
  );
}
