import {useQuery} from 'react-query';
import {
  shopData,
  shippingsDataByCountry,
  paymentsData,
} from '../actions/appactions';

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
