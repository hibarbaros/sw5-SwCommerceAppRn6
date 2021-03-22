import _ from 'lodash';
import md5 from 'react-native-md5';
import bcrypt from 'react-native-bcrypt';

//German categories id = 3

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

export function priceWithTax(price, tax = 0) {
  const taxCalc = tax / 100 + 1;
  const priceCalc = price * taxCalc;
  const fixed = priceCalc.toFixed(2);
  return parseInt(fixed, 10);
}

export function checkMd5Pass(password) {
  const check = md5.hex_md5(password);
  return check ? true : false;
}

export function checkBcryptPass(password, hashPassword) {
  const check = bcrypt.compareSync(password, hashPassword);
  return check ? true : false;
}

//TODO: bu function gözden gecirilmeli
export function findVariantProductOrderNumber(productData, selectedVariants) {
  let returnObject = {};
  const flatDetail = [...productData.details, productData.mainDetail];
  flatDetail.forEach((element) => {
    let findedCount = 0;
    return selectedVariants.forEach((variant) => {
      const finded = element.configuratorOptions.some(
        (x) => x.id === variant.variant.id,
      );
      if (finded) {
        findedCount++;
        if (findedCount === selectedVariants.length) {
          returnObject.number = element.number;
          returnObject.prices = element.prices;
        }
      }
    });
  });
  return returnObject;
}
