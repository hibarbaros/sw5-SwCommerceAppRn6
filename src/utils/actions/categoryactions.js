import Api from '../api';
import _ from 'lodash';

export async function categoryDetail(categoryId) {
  const response = await Api.get(`/ConnectorCategories/${categoryId}`);
  if (response.data) {
    return response.data;
  }
}

export async function categories() {
  const response = await Api.get('/ConnectorCategories');
  if (response.data) {
    const active = _.filter(response.data, {active: true});
    return active;
  }
}

export async function categoriesByRecomended() {
  const response = await Api.get('ConnectorCategories');
  if (response.data) {
    const active = _.filter(response.data, {active: true, attr6: '1'});
    return active;
  }
}

export function setSubCategories(subCat) {
  flatChildCategories(subCat);
  return subCat.children[0];
}

export async function flatChildCategories(category) {
  let categories = [];
  let i;
  for (i = 0; i < category.children.length; i++) {
    categories.push(category.children[i]);
    if (category.children[i].children) {
      const subCat = setSubCategories(category.children[i]);
      categories.push(subCat);
    }
  }
  return _.orderBy(categories, ['id'], ['asc']);
}
