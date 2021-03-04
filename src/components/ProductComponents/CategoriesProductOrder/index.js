import React from 'react';
import _ from 'lodash';

import {Styled} from './styles';

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
  function handleProductsOrder(index) {
    console.log('products', products);

    let orderedproducts = [];
    if (index === 0) {
      orderedproducts = _.orderBy(products, ['name'], ['asc']);
    }
    if (index === 1) {
      orderedproducts = _.orderBy(products, ['name'], ['desc']);
    }
    if (index === 2) {
      orderedproducts = _.orderBy(products, ['price'], ['asc']);
    }
    if (index === 3) {
      orderedproducts = _.orderBy(products, ['price'], ['desc']);
    }

    setProducts(orderedproducts);
  }

  function handleSheet(index) {
    handleProductsOrder(index);
    actionSheetRef.current.setModalVisible();
  }

  return (
    <Styled.StyledActionSheet ref={actionSheetRef}>
      <Styled.ActionSheetWrapper>
        {data.map((item, index) => {
          return (
            <Styled.Item
              key={index}
              onPress={() => {
                handleSheet(index);
              }}>
              <Styled.ItemText>{item}</Styled.ItemText>
            </Styled.Item>
          );
        })}
      </Styled.ActionSheetWrapper>
    </Styled.StyledActionSheet>
  );
}
