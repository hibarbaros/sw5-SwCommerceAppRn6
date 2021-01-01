import React from 'react';
import Media from '../../Common/Media/Media';

import {Styled} from './styles';

const ProductDetailMedia = ({images}) => {
  return (
    <>
      {images && (
        <Styled.StyledSwiperFlatList index={0} showPagination>
          {images.map((image, index) => (
            <Styled.MediaContainer key={index}>
              <Media mediaId={image.mediaId} />
            </Styled.MediaContainer>
          ))}
        </Styled.StyledSwiperFlatList>
      )}
    </>
  );
};

export default ProductDetailMedia;
