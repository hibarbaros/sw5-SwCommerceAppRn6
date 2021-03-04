import React, {useRef, useContext} from 'react';
import Carousel from 'react-native-anchor-carousel';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

import ProductCard from '../ProductCard';
import AppContext from '../../../context/AppContext';
import {LocalizationContext} from '../../../context/Translations';
import {Headline} from '../../../themes/components';

import {Styled} from './styles';

export default function VisitedProducts() {
  const carouselRef = useRef(null);
  const {translations} = useContext(LocalizationContext);
  const {visitedProducts} = useContext(AppContext);

  const renderCarouselItem = ({item}) => {
    return <ProductCard theme="theme01" productId={item.id} />;
  };

  return (
    visitedProducts.length > 0 && (
      <Styled.Container>
        <Styled.CategoryTitleContainer>
          <Headline type="h3">{translations.visitedProducts}</Headline>
        </Styled.CategoryTitleContainer>
        <Carousel
          data={visitedProducts}
          renderItem={renderCarouselItem}
          itemWidth={wp('60%')}
          containerWidth={wp('100%')}
          separatorWidth={0}
          inActiveScale={1}
          inActiveOpacity={1}
          ref={carouselRef}
          pagingEnable={true}
          //minScrollDistance={20}
        />
      </Styled.Container>
    )
  );
}
