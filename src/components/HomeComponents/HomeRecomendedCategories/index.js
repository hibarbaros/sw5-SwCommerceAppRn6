import React from 'react';

import CategoryProducts from './CategoryProducts';
import {Headline} from '../../../themes/components';
import {useCollectionByCollectinName} from '../../../utils/hooks/useFirebase';

export default function HomeRecomendedCategories({collection, doc}) {
  const {data} = useCollectionByCollectinName(collection, doc);

  return (
    <>
      {data &&
        data.map((category) => (
          <React.Fragment key={category.id}>
            <Headline variant="h5" ml={10} mt={20}>
              {category.name}
            </Headline>
            <CategoryProducts categoryId={category.id} />
          </React.Fragment>
        ))}
    </>
  );
}
