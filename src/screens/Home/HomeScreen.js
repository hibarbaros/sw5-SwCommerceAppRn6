import React, {useState, useCallback, useContext} from 'react';
import {RefreshControl, ScrollView} from 'react-native';
import {View} from 'react-native-ui-lib';
import {useQueryClient} from 'react-query';

import {LocalizationContext} from '../../context/Translations';
import AppContext from '../../context/AppContext';
import {Headline} from '../../themes/components';
import Carousel from '../../components/Common/Carousel/Carousel';
import VisitedProducts from '../../components/Common/VisitedProducts';
// import HomeMainCarousel from '../../components/HomeComponents/HomeMainCarousel';
// import HomeRecomendedCategories from '../../components/HomeComponents/HomeRecomendedCategories';

import {Styled} from './styles';

const HomeScreen = () => {
  const {translations} = useContext(LocalizationContext);
  const {selectedLanguage, translations: lang} = useContext(AppContext);
  const cache = useQueryClient();

  const [refreshing, setRefreshing] = useState(false);

  console.log(
    'translations.general.deliveryShippingFree :>> ',
    lang?.general.deliveryShippingFree,
  );

  const wait = (timeout) => {
    return new Promise((resolve) => {
      setTimeout(resolve, timeout);
    });
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => {
      setRefreshing(false);
      cache.invalidateQueries('topSaleData');
    });
  }, []);

  return (
    <ScrollView
      showsVerticalScrollIndicator={true}
      scrollEventThrottle={16}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <View>
        <Styled.MainCarouselContainer marginV-s5>
          {/* <HomeMainCarousel refreshing={refreshing} /> */}
        </Styled.MainCarouselContainer>

        <Styled.Container>
          <Styled.CategoryTitleContainer>
            <Headline type="h3">{translations.recomendedProducts}</Headline>
          </Styled.CategoryTitleContainer>
          <Carousel
            collection="homescreenrecomended"
            doc={`mainCategory${selectedLanguage}`}
            cardTheme="theme02"
            cardWidth={160}
          />
        </Styled.Container>

        <Styled.Container>
          <Styled.CategoryTitleContainer>
            <Headline type="h3">{translations.topSale}</Headline>
          </Styled.CategoryTitleContainer>

          <Carousel
            collection="homescreentopsale"
            doc={`mainCategory${selectedLanguage}`}
            cardTheme="theme02"
            cardWidth={160}
          />
        </Styled.Container>
        <VisitedProducts />

        <Styled.Container>
          <Styled.CategoryTitleContainer>
            <Headline type="h3">{translations.recomendedCategories}</Headline>
          </Styled.CategoryTitleContainer>
          {/* <HomeRecomendedCategories /> */}
        </Styled.Container>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
