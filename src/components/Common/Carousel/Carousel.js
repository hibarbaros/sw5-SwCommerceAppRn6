import React, {useRef} from 'react';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

import {useCollectionByCollectinName} from '../../../utils/hooks/useFirebase';
// import {useProductCustomAttr} from '../../../utils/hooks/useProduct';
import ProductCard from '../ProductCard/ProductCard';

import {Styled} from './styles';

export default function Carousel({cardTheme, collection, attrId}) {
  const carouselRef = useRef(null);

  // const {data: products = []} = useProductCustomAttr(attrId);
  const {data: carouselData = []} = useCollectionByCollectinName(collection);

  const renderCarouselItem = ({item}) => {
    return <ProductCard theme={cardTheme} productId={item.id} product={item} />;
  };

  return (
    <>
      {carouselData.length > 0 && (
        <Styled.StyledCarousel
          data={carouselData}
          renderItem={renderCarouselItem}
          itemWidth={150}
          containerWidth={wp('100%')}
          separatorWidth={0}
          inActiveScale={1}
          inActiveOpacity={1}
          ref={carouselRef}
          pagingEnable={true}
        />
      )}
    </>
  );
}
