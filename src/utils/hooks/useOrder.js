import {useQuery, useMutation} from 'react-query';
import Toast from 'react-native-toast-message';

import {useLocalizationContext} from 'context/Translations';
import {useAppContext} from 'context/AppContext';
import {useCheckoutContext} from 'context/CheckoutContext';

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
  return useQuery(['orderDetail', orderId], () => getOrderByOrderId(orderId), {
    enabled: !!orderId,
  });
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
const getCreateOrder = async (mutateVariables) => {
  const data = await orderCreate(mutateVariables);
  return data;
};

export function useCreateOrder() {
  const {translations} = useLocalizationContext();
  const {user, currency} = useAppContext();
  const {
    selectedPaymentMethod,
    selectedShippingMethod,
    selectedShippingAddress,
    selectedBilllingAddress,
  } = useCheckoutContext();

  const mutateVariables = {
    user,
    paymentMethodId: selectedPaymentMethod?.id,
    currency,
    selectedShippingAddress,
    selectedBilllingAddress,
    selectedShippingMethod,
  };

  const mutate = useMutation(() => getCreateOrder(mutateVariables), {
    onError: (e) => {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: e.message,
      });
    },
    onSuccess: () => {
      Toast.show({
        text1: 'Success',
        text2: translations.formularSuccess,
      });
    },
  });

  return mutate;
}
//Create Order
