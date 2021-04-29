import React from 'react';
import {Text, Div} from 'react-native-magnus';
import StickyHeaderFooterScrollView from 'react-native-sticky-header-footer-scroll-view';
import _ from 'lodash';

import {useAttributesOptions} from '../../../utils/hooks/useProduct';
import {categoryFilterList} from '../../../utils/functions';

import {Headline, TopNavigation} from '../../../themes/components';
import Button from '../../../themes/components/Button';

import CheckItem from './CheckItem';

export default function ProductAttributes({
  products,
  setFilteredProducts,
  selectedFilter,
  setSelectedFilter,
  setIsModalOpen,
}) {
  const {data, isLoading} = useAttributesOptions();

  if (isLoading) {
    return <Text>Loading</Text>;
  }

  const filterList = categoryFilterList(products, data);

  const handleFilterCheck = (e, option) => {
    let list = [...selectedFilter];
    if (e) {
      list.push(option);
    } else {
      _.remove(list, {valueID: option.valueID});
    }
    setSelectedFilter(list);
  };

  const handleProductFilter = () => {
    let list = [];
    for (const product of products) {
      for (const filter of selectedFilter) {
        const found = _.some(product.filters, {valueID: filter.valueID});
        found && list.push(product);
      }
    }
    setFilteredProducts(list);
    setIsModalOpen(false);
  };

  return (
    <StickyHeaderFooterScrollView
      makeScrollable={true}
      additionalHeightReserve={500}
      fitToScreen={true}
      renderStickyHeader={() => (
        <TopNavigation
          title="Products Filter"
          icon="x"
          onPress={() => setIsModalOpen(false)}
        />
      )}
      renderStickyFooter={() => (
        <>
          <Button
            text="Clear Filter"
            block
            mt={20}
            onPress={() => {
              setSelectedFilter([]);
              setFilteredProducts(products);
            }}
          />
          <Button text="Filter" my={10} block onPress={handleProductFilter} />
        </>
      )}>
      <Div px={20} py={100}>
        {filterList.map(
          (item) =>
            item.options.length > 0 && (
              <Div key={item.id} my={10}>
                <Headline my={5}>{item.name}</Headline>
                {item.options.map((option) => (
                  <Div key={option.valueID}>
                    <CheckItem
                      option={option}
                      onPress={(e) => handleFilterCheck(e, option)}
                      selectedFilter={selectedFilter}
                    />
                  </Div>
                ))}
              </Div>
            ),
        )}
      </Div>
    </StickyHeaderFooterScrollView>
  );
}
