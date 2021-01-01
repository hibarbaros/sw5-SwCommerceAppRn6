import _ from 'lodash';

//detsuch categories id = 3

function setSubCategories(data, categoryId) {
  const categories = _.filter(data, {parentId: categoryId});
  return categories;
}

export function setProductCategories(data) {
  const mainCategories = _.filter(data, {id: 3});

  let categoriesTree = [];
  let element = {};
  let i;
  for (i = 0; i < data.length; i++) {
    let dataSubCategories = setSubCategories(data, data[i].id);
    if (dataSubCategories.length > 0) {
      element = data[i];
      element.children = dataSubCategories;
      categoriesTree.push(element);
    }
    if (dataSubCategories.length === 0 && data[i].parentId === 3) {
      element = data[i];
      categoriesTree.push(element);
    }
  }
  categoriesTree = _.filter(categoriesTree, {parentId: mainCategories[0].id});
  return _.orderBy(categoriesTree, ['id'], ['asc']);
}

export const priceWithTax = (price, tax = 0) => {
  const taxCalc = tax / 100 + 1;
  const priceCalc = price * taxCalc;
  const fixed = priceCalc.toFixed(2);
  return parseInt(fixed);
};
