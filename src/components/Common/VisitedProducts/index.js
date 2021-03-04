import React, {useContext} from 'react';

import ProductCard from '../ProductCard';
import AppContext from '../../../context/AppContext';
import {LocalizationContext} from '../../../context/Translations';
import {Headline} from '../../../themes/components';

import {Styled} from './styles';

export default function VisitedProducts() {
  const {translations} = useContext(LocalizationContext);
  const {visitedProducts} = useContext(AppContext);

  const renderCarouselItem = ({item}) => {
    return <ProductCard theme="theme02" productId={item.id} />;
  };

  return (
    visitedProducts.length > 0 && (
      <Styled.Container>
        <Styled.CategoryTitleContainer>
          <Headline type="h3">{translations.visitedProducts}</Headline>
        </Styled.CategoryTitleContainer>
        <Styled.StyledCarousel
          horizontal
          showsHorizontalScrollIndicator={false}
          automaticallyAdjustContentInsets={true}
          removeClippedSubviews={true}
          enableEmptySections={true}
          data={visitedProducts}
          renderItem={(item) => renderCarouselItem(item)}
          keyExtractor={(item, index) => index.toString()}
        />
      </Styled.Container>
    )
  );
}
