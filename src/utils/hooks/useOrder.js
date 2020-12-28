import {useContext} from 'react';
import {useQuery, useMutation} from 'react-query';
import {LocalizationContext} from '../../context/Translations';
import Toast from 'react-native-toast-message';

import {
  orderbyCustomerList,
  orderDetail,
  orderCreate,
} from '../actions/orderactions';

const getOrderByOrderId = async (orderId) => {
  const data = await orderDetail(orderId);
  return data;
};

export function useOrderByOrderId(orderId) {
  return useQuery(['orderDetail', orderId], () => getOrderByOrderId(orderId));
}

const getOrderByCustomerId = async (userId) => {
  const data = await orderbyCustomerList(userId);
  return data;
};

export function useOrdersByCustomerId(userId) {
  return useQuery(['userOrdersData', userId], () =>
    getOrderByCustomerId(userId),
  );
}

//Create Order
const getCreateOrder = async (values) => {
  const data = await orderCreate(values);
  return data;
};

export function useCreateOrder() {
  const {translations} = useContext(LocalizationContext);
  const mutate = useMutation((values) => getCreateOrder(values), {
    onError: (e) => {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: e.message,
      });
    },
    onSuccess: (data) => {
      if (data) {
        return true;
      }
      if (!data) {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: translations.formularError,
        });
      }
    },
  });

  return mutate;
}
//Create Order
