import React from 'react';
import {Div} from 'react-native-magnus';
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
    return null;
  }

  const filterList = categoryFilterList(products, data);

  const handleFilterCheck = (toggle, option) => {
    let list = [...selectedFilter];
    if (toggle) {
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
      fitToScreen={true}
      renderStickyHeader={() => (
        <TopNavigation
          title="Products Filter"
          icon="x"
          onPress={() => setIsModalOpen(false)}
        />
      )}
      renderStickyFooter={() => (
        <Div row px={10} py={5}>
          <Div w="50%">
            <Button
              variant="secondary"
              mx={5}
              text="Clear Filter"
              block
              onPress={() => {
                setSelectedFilter([]);
                setFilteredProducts(products);
              }}
            />
          </Div>
          <Div w="50%">
            <Button
              text="Apply"
              mx={5}
              block
              onPress={handleProductFilter}
              variant="secondary"
            />
          </Div>
        </Div>
      )}>
      <Div px={20}>
        {filterList.map(
          (item) =>
            item.options.length > 0 && (
              <Div key={item.id} my={5}>
                <Headline my={5} variant="h5" bold>
                  {item.name}
                </Headline>
                <Div row flexWrap="wrap">
                  {item.options.map((option) => (
                    <CheckItem
                      key={option.valueID}
                      option={option}
                      onPress={(toggle) => handleFilterCheck(toggle, option)}
                      selectedFilter={selectedFilter}
                    />
                  ))}
                </Div>
              </Div>
            ),
        )}
      </Div>
    </StickyHeaderFooterScrollView>
  );
}
