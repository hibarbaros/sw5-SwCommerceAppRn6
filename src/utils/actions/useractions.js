import uuid from 'react-uuid';

import Api from '../api';
import {removeItem, setItem} from '../../utils/storagehelper';
import {
  checkMd5Pass,
  checkBcryptPass,
  makeBcryptPass,
} from '../../utils/functions';
import {
  customerRegisterNormalize,
  customerEditNormalize,
  passwordEditNormalize,
} from '../normalize/userNormalize';

export const customerCheck = async (values) => {
  const response = await Api.get(
    `/ConnectorCustomers?filter[email]=${values.email}`,
  );
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
  const {customerId, values} = data;
  const formData = customerEditNormalize(values);
  const response = await Api.put(`/ConnectorCustomers/${customerId}`, formData);
  return response.data.id ? true : false;
}
//TODO: sifre degistirmede problem var. sifre degistirmek icin bir api yapilabilir
export async function passwordEdit(values) {
  const {oldPassword, hashPassword, encoderName, customer, password} = values;
  const hash = await makeBcryptPass(password);
  if (encoderName === 'md5') {
    const checked = checkMd5Pass(oldPassword);
    if (!checked) {
      return false;
    }
  }
  if (encoderName === 'bcrypt') {
    const checked = checkBcryptPass(oldPassword, hashPassword);
    if (!checked) {
      return false;
    }
  }
  const formData = passwordEditNormalize(customer, hash);
  const response = await Api.put(
    `/ConnectorCustomers/${customer.id}`,
    formData,
  );
  return response.data.id ? true : false;
}

export async function userLogin(values) {
  const {email, password} = values;
  const response = await Api.get(`/ConnectorCustomers?filter[email]=${email}`);
  const [user] = response.data;
  if (user) {
    if (user.encoderName === 'md5') {
      const checked = checkMd5Pass(password);
      return checked ? user : false;
    }
    if (user.encoderName === 'bcrypt') {
      const hash = user.hashPassword;
      const checked = checkBcryptPass(password, hash);
      return checked ? user : false;
    }
  } else {
    //Email not found
    return false;
  }
}

export async function checkUserForLogin(values) {
  const {email, password} = values;
  const response = await Api.get(`/ConnectorCustomers?filter[email]=${email}`);
  let {data} = response;
  if (data.length > 0) {
    if (data[0].encoderName === 'md5') {
      const checked = checkMd5Pass(password);
      return checked ? data[0] : false;
    }
    if (data[0].encoderName === 'bcrypt') {
      const checked = checkBcryptPass(password, data[0].hashPassword);
      return checked ? data[0] : false;
    }
  } else {
    //Email not found
    return false;
  }
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
