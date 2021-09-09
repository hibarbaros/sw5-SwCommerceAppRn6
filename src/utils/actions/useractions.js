import uuid from 'react-uuid';

import Api from '../api';
import { removeItem, setItem } from '../../utils/storagehelper';
import { makeBcryptPass, checkHashPassword } from '../../utils/functions';
import {
  customerRegisterNormalize,
  customerEditNormalize,
  passwordEditNormalize
} from '../normalize/userNormalize';

export const customerCheck = async (values) => {
  const response = await Api.get(`/ConnectorCustomers?filter[email]=${values.email}`);
  return response.total ? true : false;
};

export const customerRegister = async (data) => {
  const sessionId = uuid();
  const check = await customerCheck(data);
  if (check) {
    return false; // kullanici kayitli
  } else {
    const formData = customerRegisterNormalize(data, sessionId);
    const response = await Api.post('/ConnectorCustomers', formData);
    response.data.sessionId = sessionId;
    return response;
  }
};

export async function customerEdit(data) {
  const { customerId, values } = data;
  const formData = customerEditNormalize(values);
  const response = await Api.put(`/ConnectorCustomers/${customerId}`, formData);
  return response.data.id ? true : false;
}
export async function passwordEdit(values) {
  const { oldPassword, hashPassword, encoderName, customer, password } = values;
  const hash = await makeBcryptPass(password);
  const checkedHashPassword = await checkHashPassword(encoderName, oldPassword, hashPassword);
  if (!checkedHashPassword) {
    return false;
  } else {
    const formData = passwordEditNormalize(hash);
    const response = await Api.put(`/ConnectorCustomers/${customer.id}?putPassword=true`, formData);
    return response.data.id ? true : false;
  }
}

export async function userLogin(values) {
  const { email, password } = values;
  const apiUrl = `/ConnectorCustomers?useLogin=true&email="${email}"&password=${password}`;
  const response = await Api.get(apiUrl);
  const user = response.data;
  return user ? user : false;
}

export const customerData = async (customerId) => {
  if (customerId) {
    const user = await Api.get(`/ConnectorCustomers/${customerId}`);
    return user.data;
  } else {
    return false;
  }
};

export async function setUserStorage(userId, sessionId) {
  setItem('user', userId);
  setItem('sessionId', sessionId);
}

export function customerLogout() {
  removeItem('user');
  removeItem('sessionId');
}
