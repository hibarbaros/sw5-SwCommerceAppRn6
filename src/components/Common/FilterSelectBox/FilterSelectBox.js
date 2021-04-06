import React from 'react';
import {ScrollView} from 'react-native';
import {View} from 'react-native-ui-lib';
import {Button, ButtonGroup} from '@ui-kitten/components';
import FilterSelect from './FilterSelect';

export default function FilterSelectBox({
  allProducts,
  filterProperties,
  setChecked,
  checked,
  handleFilteredproducts,
  handleClearFilter,
}) {
  return (
    <ScrollView>
      {filterProperties.map((filter, i) => {
        return (
          <FilterSelect
            key={i}
            allProducts={allProducts}
            checked={checked}
            filter={filter}
            setChecked={setChecked}
          />
        );
      })}
      <View marginT-s5 center>
        <ButtonGroup size="medium">
          <Button onPress={() => handleFilteredproducts()}>Filter</Button>
          <Button onPress={() => handleClearFilter()}>Clear Filter</Button>
        </ButtonGroup>
      </View>
    </ScrollView>
  );
}
