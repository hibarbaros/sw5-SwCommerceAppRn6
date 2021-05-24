import _ from 'lodash';
import md5 from 'react-native-md5';
import bcrypt from 'react-native-bcrypt';

import vars from '../utils/vars';

function setSubCategories(data, categoryId) {
  const categories = _.filter(data, {parentId: categoryId});
  return categories;
}

export function setProductCategories(allCategories, selectedLanguage) {
  const mainCategory = _.find(allCategories, {id: selectedLanguage});
  let categoriesTree = [];
  for (const category of allCategories) {
    const dataSubCategories = setSubCategories(allCategories, category.id);
    if (
      dataSubCategories.length === 0 &&
      category.parentId === selectedLanguage
    ) {
      const element = category;
      categoriesTree.push(element);
    }
    if (dataSubCategories.length > 0) {
      const element = category;
      element.children = dataSubCategories;
      categoriesTree.push(element);
    }
  }
  categoriesTree = _.filter(categoriesTree, {parentId: mainCategory.id});
  return _.orderBy(categoriesTree, ['id'], ['asc']);
}

export function priceWithTax(price, tax = 0) {
  const taxCalc = tax / 100 + 1;
  const priceCalc = price * taxCalc;
  return priceCalc;
}

export async function checkMd5Pass(password) {
  const check = md5.hex_md5(password);
  return check ? true : false;
}

export async function checkBcryptPass(password, hashPassword) {
  const check = bcrypt.compareSync(password, hashPassword);
  return check ? true : false;
}
export async function checkHashPassword(
  encoderName,
  oldPassword,
  hashPassword,
) {
  if (encoderName === 'md5') {
    const checked = await checkMd5Pass(oldPassword);
    return checked ? true : false;
  }
  if (encoderName === 'bcrypt') {
    const checked = await checkBcryptPass(oldPassword, hashPassword);
    return checked ? true : false;
  }
}
export async function makeBcryptPass(password) {
  const hash = await bcrypt.hashSync(password, 12);
  console.log('hash :>> ', hash);
  return hash;
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

export const makeImageUrl = (thumbnail) => {
  return `${vars.imageUrl}/media/image/${thumbnail.path}.${thumbnail.extension}`;
};

export const categoryFilterList = (categoryProducts, attributesOptions) => {
  const filterList = _.map(categoryProducts, 'filters');
  const flatted = _.flatten(filterList);
  const uniqueFilterList = _.uniqBy(flatted, 'valueID');

  const filteredData = attributesOptions.map((item) => ({
    id: item.id,
    name: item.name,
    options: uniqueFilterList.filter(
      (x) => parseInt(x.optionID, 10) === item.id,
    ),
  }));

  return filteredData;
};
