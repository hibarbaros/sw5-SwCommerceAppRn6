import React from 'react';

import Media from 'components/Common/Media/Media';

import {Styled} from './styles';

export default function ProductDetailMedia({images}) {
  return (
    <Styled.StyledSwiperFlatList index={0} showPagination>
      {images.map((image) => (
        <Styled.MediaContainer key={image.id}>
          <Media thumbnail={image} />
        </Styled.MediaContainer>
      ))}
    </Styled.StyledSwiperFlatList>
  );
}
