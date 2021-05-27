import Api from '../api';
import {orderNormalize} from '../normalize/orderNormalize';

export async function orderbyCustomerList(customerId) {
  const response = await Api.get(`/ConnectorCustomers/${customerId}`);
  if (response.data.orders) {
    return response.data.orders;
  } else {
    return null;
  }
}

export async function orderDetail(orderId) {
  const response = await Api.get(`/orders/${orderId}`);
  if (response.data) {
    return response.data;
  } else {
    return null;
  }
}

export async function orderCreate(mutateVariables) {
  const {user} = mutateVariables;
  const products = await Api.get(`/ConnectorBasket?filter[customerId]=${user}`);
  mutateVariables.details = products;

  const formData = orderNormalize(mutateVariables);
  const response = await Api.post('/orders', formData);
  console.log('response', response);
  if (response.data?.id) {
    return response.data.id;
  } else {
    return false;
  }
}

export default {
  orderbyCustomerList,
  orderDetail,
  orderCreate,
};
