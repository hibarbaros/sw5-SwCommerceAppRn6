import React from 'react';
import { Div } from 'react-native-magnus';
import _ from 'lodash';

import VariantItem from './VariantItem';

export default function ProductDetailVariants({
  productData,
  setSelectedVariants,
  selectedVariants,
  groups
}) {
  function handleSetVariant(variant) {
    const initialList = selectedVariants ? [...selectedVariants] : [];
    _.remove(initialList, (n) => n.groupId === variant.groupId);
    initialList.push(variant);
    setSelectedVariants(initialList);
  }

  return (
    <Div>
      {groups.map((item) => (
        <VariantItem
          key={item.id}
          item={item}
          groups={groups}
          details={productData.details}
          handleSetVariant={handleSetVariant}
        />
      ))}
    </Div>
  );
}
