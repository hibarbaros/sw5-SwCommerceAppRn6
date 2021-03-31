import moment from 'moment';

import Api from '../api';
import {priceWithTax} from '../functions';
import {orderNormalize} from '../normalize/orderNormalize';

export async function orderbyCustomerList(customerId) {
  const response = await Api.get(`/ConnectorCustomers/${customerId}`);
  const allOrders = response.data.orders;
  if (allOrders) {
    return allOrders;
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

export async function orderCreate(orderData) {
  const formData = orderNormalize(orderData);
  console.log(`formData`, formData);
  // const response = await Api.post('/orders', formData);
  // if (response.data.id > 0) {
  //   return response.data;
  // } else {
  //   return false;
  // }
}

export default {
  orderbyCustomerList,
  orderDetail,
  orderCreate,
};
