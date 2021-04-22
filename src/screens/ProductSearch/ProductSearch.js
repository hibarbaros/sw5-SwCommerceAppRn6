/* eslint-disable react-native/no-inline-styles */
import React, {useState, useContext} from 'react';
import {FlatList} from 'react-native';
import {Input, Icon, Div} from 'react-native-magnus';
import {Spinner} from '@ui-kitten/components';

import {Container} from '../../themes/components';
import VisitedProducts from '../../components/Common/VisitedProducts';
import {useSearchByString} from '../../utils/hooks/useProduct';
import {LocalizationContext} from '../../context/Translations';
import ProductCard from '../../components/Common/ProductCard';
import {Headline} from '../../themes/components';

export default function ProductSearch() {
  const {translations} = useContext(LocalizationContext);
  const [value, setValue] = useState('');

  const {status, data} = useSearchByString(value.length > 2 && value);

  const renderItem = ({item}) => (
    <ProductCard theme="theme03" productId={item.id} />
  );

  return (
    <>
      <Container>
        <Headline mb={10}>{translations.productSearch}</Headline>
        <Input
          placeholder={translations.productSearch}
          p={10}
          focusBorderColor="blue700"
          suffix={<Icon name="search" color="gray900" fontFamily="Feather" />}
          onChangeText={(text) => setValue(text)}
        />
      </Container>
      {status === 'loading' && <Spinner />}
      {value.length > 2 ? (
        <FlatList
          contentContainerStyle={{paddingBottom: 500}}
          contentInsetAdjustmentBehavior="automatic"
          scrollEnabled={true}
          numColumns={2}
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <Div h={300} mt={30}>
          <VisitedProducts />
        </Div>
      )}
    </>
  );
}
