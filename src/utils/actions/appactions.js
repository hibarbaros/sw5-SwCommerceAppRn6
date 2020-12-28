import Api from '../api';
import _ from 'lodash';

export async function countriesData() {
  const response = await Api.get('/countries');
  const active = _.filter(response.data, {active: true});
  return active;
}
export async function paymentsData() {
  const response = await Api.get('/ConnectorPaymentMethods');
  const active = _.filter(response.data, {active: true});
  return active;
}
export async function shippingsData() {
  const response = await Api.get('/ConnectorShippingMethods');
  const active = _.filter(response.data, {active: true});
  return active;
}
export async function shippingsDataByCountry(countryId) {
  const response = await Api.get('/ConnectorShippingMethods');
  console.log(
    '🚀 ~ file: appactions.js ~ line 21 ~ shippingsDataByCountry ~ response',
    response,
  );
  const active = _.filter(response.data, {active: true});
  let shippingList = [];
  _(active).forEach(function (item) {
    const finded = _.find(item.countries, {countryID: countryId.toString()});
    finded && shippingList.push(item);
  });
  if (shippingList) {
    return shippingList;
  } else {
    return null;
  }
}
export async function shopData() {
  const response = await Api.get('/ConnectorShops');
  const shop = _.filter(response.data, {active: true, position: 0});
  const shop_default = await Api.get(`/ConnectorShops/${shop[0].id}`);
  return shop_default.data;
}
