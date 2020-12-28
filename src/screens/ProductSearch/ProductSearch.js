import React, {useState, useContext} from 'react';
import {SafeAreaView, FlatList} from 'react-native';
import {Input, Spinner} from '@ui-kitten/components';

import {Container} from '../../themes/components';
import VisitedProducts from '../../components/Common/VisitedProducts/VisitedProducts';
import {useSearchByString} from '../../utils/hooks/useProduct';
import {LocalizationContext} from '../../context/Translations';
import ProductCard from '../../components/Common/ProductCard/ProductCard';

import {Styled} from './styles';

export default function ProductSearch() {
  const {translations} = useContext(LocalizationContext);
  const [value, setValue] = useState('');

  const {status, data: searchProducts = []} = useSearchByString(value);

  const renderItem = ({item}) => (
    <ProductCard theme="theme03" productId={item.id} />
  );

  return (
    <SafeAreaView>
      <Container>
        <Styled.ScreenTitle>{translations.productSearch}</Styled.ScreenTitle>
        <Input
          placeholder={translations.productSearch}
          value={value}
          onChangeText={(nextValue) => setValue(nextValue)}
        />
      </Container>
      {status === 'loading' && <Spinner />}
      {value !== '' && (
        <>
          <FlatList
            contentInset={{bottom: 100}}
            numColumns={2}
            data={searchProducts}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
        </>
      )}
      {value === '' && <VisitedProducts />}
    </SafeAreaView>
  );
}
