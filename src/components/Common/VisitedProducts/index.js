import React, {useContext} from 'react';
import {Div} from 'react-native-magnus';
import styled from 'styled-components/native';

import ProductCard from '../ProductCard';
import AppContext from '../../../context/AppContext';
import {LocalizationContext} from '../../../context/Translations';
import {Headline} from '../../../themes/components';

export default function VisitedProducts() {
  const {translations} = useContext(LocalizationContext);
  const {visitedProducts} = useContext(AppContext);

  const renderCarouselItem = ({item}) => {
    return (
      <Div maxW={200} minW={200}>
        <ProductCard theme="theme02" productId={item} />
      </Div>
    );
  };

  return (
    visitedProducts.length > 0 && (
      <>
        <Headline variant="h1" my="md" ml={10}>
          {translations.visitedProducts}
        </Headline>
        <StyledCarousel
          horizontal
          showsHorizontalScrollIndicator={false}
          automaticallyAdjustContentInsets={true}
          removeClippedSubviews={true}
          enableEmptySections={true}
          data={visitedProducts}
          renderItem={(item) => renderCarouselItem(item)}
          keyExtractor={(item, index) => index.toString()}
        />
      </>
    )
  );
}

const StyledCarousel = styled.FlatList`
  width: 100%;
  height: 300px;
`;
