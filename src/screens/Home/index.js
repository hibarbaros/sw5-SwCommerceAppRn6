import React, { useState, useCallback } from 'react';
import { RefreshControl, ScrollView } from 'react-native';
import { useQueryClient } from 'react-query';
import { Div } from 'react-native-magnus';

import { useLocalizationContext } from 'context/Translations';
import { useAppContext } from 'context/AppContext';
import { Headline } from 'themes/components';
import Carousel from 'components/Common/FirebaseCarousel';
import VisitedProducts from 'components/Common/VisitedProducts';
import HomeMainCarousel from 'components/HomeComponents/HomeMainCarousel';
import HomeRecomendedCategories from 'components/HomeComponents/HomeRecomendedCategories';

const HomeScreen = () => {
  const { translations } = useLocalizationContext();
  const { selectedLanguage } = useAppContext();
  const cache = useQueryClient();

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      cache.invalidateQueries('topSaleData');
    }, 2000);
  }, []);

  return (
    <ScrollView
      showsVerticalScrollIndicator={true}
      scrollEventThrottle={16}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      <Div my={20}>
        <HomeMainCarousel />
      </Div>

      <Div mt={20}>
        <Carousel
          title={translations.recomendedProducts}
          collection="homescreenrecomended"
          doc={`mainCategory${selectedLanguage}`}
          cardTheme="theme02"
          cardWidth={160}
        />
      </Div>

      <Div mt={20}>
        <Carousel
          title={translations.topSale}
          collection="homescreentopsale"
          doc={`mainCategory${selectedLanguage}`}
          cardTheme="theme02"
          cardWidth={160}
        />
      </Div>

      <Div mt={20}>
        <VisitedProducts cardTheme="theme02" />
      </Div>

      <Div mt={20}>
        <Headline my="md" variant="h1" ml={10}>
          {translations.recomendedCategories}
        </Headline>
        <HomeRecomendedCategories
          collection="homescreencategories"
          doc={`mainCategory${selectedLanguage}`}
        />
      </Div>
    </ScrollView>
  );
};

export default HomeScreen;
