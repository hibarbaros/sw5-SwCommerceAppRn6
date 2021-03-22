import {useContext} from 'react';
import _ from 'lodash';

import {useQuery, useMutation} from 'react-query';
import {
  shopData,
  shippingsDataByCountry,
  paymentsData,
} from '../actions/appactions';

import AppContext from '../../context/AppContext';

const getShopPagesByShopId = async (shopId) => {
  const data = await shopData(shopId);
  return data.shopPages;
};

export function useShopPagesByShopId(shopId) {
  return useQuery(['shopPagesData', shopId], () =>
    getShopPagesByShopId(shopId),
  );
}

const getShopByShopId = async (shopId) => {
  const data = await shopData(shopId);
  return data;
};

export function useShopByShopId(shopId) {
  return useQuery(['shopPagesData', shopId], () => getShopByShopId(shopId));
}

const getShippingByCountryId = async (countryId) => {
  const data = await shippingsDataByCountry(countryId);
  return data;
};

export function useShippingByCountryId(countryId) {
  return useQuery(['shippingMethodsData', countryId], () =>
    getShippingByCountryId(countryId),
  );
}

const getPaymentMethods = async () => {
  const data = await paymentsData();
  return data;
};

export function usePaymentMethods() {
  return useQuery('paymentMethodsData', () => getPaymentMethods());
}

const getAddRemoveToWishList = async (productId, whislist, setWhislist) => {
  let products = whislist;
  const someProduct = _.some(products, {id: productId});
  if (someProduct) {
    _.remove(products, {id: productId});
  } else {
    products.push(productId);
  }
  setWhislist(products);
  return true;
};

export function useAddRemoveToWishList() {
  const {whislist, setWhislist} = useContext(AppContext);
  const mutate = useMutation('paymentMethodsData', (productId) =>
    getAddRemoveToWishList(productId, whislist, setWhislist),
  );
  return mutate;
}
