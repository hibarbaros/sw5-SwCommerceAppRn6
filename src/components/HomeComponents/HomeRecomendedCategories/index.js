import React from 'react';
import {View} from 'react-native-ui-lib';

import CategoryProducts from './CategoryProducts';
import {Headline} from '../../../themes/components';
import {useCollectionByCollectinName} from '../../../utils/hooks/useFirebase';

export default function HomeRecomendedCategories({collection, doc}) {
  const {data = []} = useCollectionByCollectinName(collection, doc);

  return data.map((category) => {
    const {id, name} = category;
    return (
      <View key={id}>
        <View marginL-s5 marginT-s5>
          <Headline type="h6">{name}</Headline>
        </View>
        <CategoryProducts categoryId={id} />
      </View>
    );
  });
}
