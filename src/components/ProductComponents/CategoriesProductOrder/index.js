import React, {useState} from 'react';
import {Dropdown, Text, Icon} from 'react-native-magnus';
import _ from 'lodash';

const data = [
  'Name A-Z',
  'Name Z-A',
  'Prise, aufsteigend',
  'Prise, absteigend',
];

export default function CategoriesProductOrder({
  products,
  setProducts,
  actionSheetRef,
}) {
  const [isIndex, setIsIndex] = useState(null);

  function handleProductsOrder(index) {
    let orderedproducts = [];
    if (index === 0) {
      orderedproducts = _.orderBy(products, ['name'], ['asc']);
    }
    if (index === 1) {
      orderedproducts = _.orderBy(products, ['name'], ['desc']);
    }
    if (index === 2) {
      orderedproducts = _.orderBy(
        products,
        ['mainDetail.prices[0].price'],
        ['asc'],
      );
    }
    if (index === 3) {
      orderedproducts = _.orderBy(
        products,
        ['mainDetail.prices[0].price'],
        ['desc'],
      );
    }

    setProducts(orderedproducts);
  }

  function handleSheet(index) {
    handleProductsOrder(index);
    setIsIndex(index);
    actionSheetRef.current.close();
  }

  return (
    <Dropdown
      ref={actionSheetRef}
      title={
        <Text fontSize="3xl" fontWeight="bold" mx="xl" color="primary" pb="md">
          Products Order
        </Text>
      }
      mt="md"
      pb="2xl"
      showSwipeIndicator={true}
      roundedTop="xl">
      {data.map((item, index) => (
        <Dropdown.Option
          key={index}
          py="md"
          px="xl"
          block
          prefix={
            isIndex === index && (
              <Icon
                name="chevron-right"
                color="primary"
                fontSize="xl"
                fontFamily="Feather"
              />
            )
          }
          onPress={() => {
            handleSheet(index);
          }}>
          {item}
        </Dropdown.Option>
      ))}
    </Dropdown>
  );
}
