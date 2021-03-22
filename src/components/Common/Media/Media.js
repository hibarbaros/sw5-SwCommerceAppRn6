import React from 'react';
import {Image} from 'react-native-magnus';

import vars from '../../../utils/vars';

const Media = ({thumbnail}) => {
  const image = `${vars.host}/media/image/${thumbnail.path}.${thumbnail.extension}`;

  return (
    <Image
      h={'100%'}
      w={'100%'}
      borderRadius={10}
      source={{
        uri: image,
      }}
    />
  );
};

export default Media;
