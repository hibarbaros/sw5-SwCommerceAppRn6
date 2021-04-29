import Api from '../api';
import _ from 'lodash';

export async function categoryDetail(categoryId) {
  const response = await Api.get(`/ConnectorCategories/${categoryId}`);
  if (response.data) {
    const activeProducts = _.filter(
      response.data.products,
      (item) => item.active === true,
    );
    response.data.products = activeProducts;
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

export async function categoriesByRecomended(collection) {
  const response = await Api.get('ConnectorCategories');
  if (response.data) {
    const active = _.filter(response.data, {active: true, attr6: '1'});
    return active;
  }
}
