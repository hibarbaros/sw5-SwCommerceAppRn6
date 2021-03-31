import React, {useEffect, useState} from 'react';
import {CheckBox} from '@ui-kitten/components';
import {View, Text} from 'react-native-ui-lib';
import _ from 'lodash';

export default function FilterSelect({
  allProducts,
  filter,
  setChecked,
  checked,
}) {
  const [propertyOptions, setPropertyOptions] = useState(null);

  // TODO: kategorinin property leri ile yapilabilir

  function propertyOptionsSet() {
    const products = [...allProducts];
    let list = [];
    products.forEach((product, index, array) => {
      const properties = product.propertyValues;
      const filtered = _.filter(properties, {optionId: filter.id});
      filtered.forEach((prop) => {
        list.push(prop);
      });
      if (index + 1 === array.length) {
        const uniqResponse = _.uniqBy(list, 'id');
        setTimeout(() => {
          setPropertyOptions(uniqResponse);
        }, 100);
      }
    });
  }

  function handleChecked(prop) {
    let allProps = [];
    if (checked.length > 0) {
      allProps = [...checked];
    }
    const finded = _.find(allProps, {id: prop.id});
    if (finded) {
      _.remove(allProps, {id: prop.id});
    }
    if (!finded) {
      allProps.push(prop);
    }
    const uniqList = _.uniqBy(allProps, 'id');
    setChecked(uniqList);
  }

  useEffect(() => {
    propertyOptionsSet();
  }, []);

  return (
    <View>
      <Text text60 marginT-s5>
        {filter.name}
      </Text>
      {propertyOptions &&
        propertyOptions.map((prop, i) => {
          return (
            <View key={i} margin-s2>
              <CheckBox
                checked={_.find(checked, {id: prop.id}) && true}
                onChange={() => handleChecked(prop)}>
                {prop.value}
              </CheckBox>
            </View>
          );
        })}
    </View>
  );
}
