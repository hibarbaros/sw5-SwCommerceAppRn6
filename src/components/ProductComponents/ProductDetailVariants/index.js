import React, {useState, useEffect} from 'react';
import _ from 'lodash';
import {View} from 'react-native-ui-lib';
import SheetItem from './SheetItem';

export default function ProductDetailVariants({
  configuratorSet,
  productData,
  setSelectedVariants,
  selectedVariants,
}) {
  const [productVariants, setProductVariants] = useState(null);
  function handleSetVariant(variant, set) {
    let obj = set;
    obj.variant = variant;
    if (selectedVariants) {
      let array = [...selectedVariants];
      let filtered = array.find((x) => x.id === set.id);
      if (filtered) {
        filtered = obj;
      }
      if (!filtered) {
        array.push(obj);
      }
      setSelectedVariants(array);
    }
    if (!selectedVariants) {
      let array = [];
      array.push(obj);
      setSelectedVariants(array);
    }
  }

  useEffect(() => {
    //varyantların listesi hazırlanıyor
    let variants = [];
    _.forEach(configuratorSet.groups, function (conf) {
      _.forEach(productData.details, function (detail) {
        const filtered = _.filter(detail.configuratorOptions, {
          groupId: conf.id,
        });
        const find = _.find(variants, {id: filtered[0].id});
        if (!find) {
          variants.push(...filtered);
        }
      });
    });
    setProductVariants(variants);
  }, []);

  return (
    <View>
      {productVariants &&
        productData.configuratorSet.groups.map((set) => {
          return (
            <SheetItem
              key={set.id}
              set={set}
              productVariants={productVariants}
              handleSetVariant={handleSetVariant}
            />
          );
        })}
    </View>
  );
}
