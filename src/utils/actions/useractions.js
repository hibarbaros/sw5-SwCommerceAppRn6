import Api from '../api';
import {removeItem, setItem} from '../../utils/storagehelper';
import {checkMd5Pass, checkBcryptPass} from '../../utils/functions';
import {
  customerRegisterNormalize,
  customerEditNormalize,
  passwordEditNormalize,
} from '../normalize/userNormalize';

export const customerCheck = async (values) => {
  const response = await Api.get(
    `/ConnectorCustomers?filter[email]=${values.email}`,
  );
  return response.total !== 0 ? true : values;
};

export const customerRegister = async (data, sessionId) => {
  const check = await customerCheck(data);
  if (check) {
    // kullanici kayitli
    return false;
  } else {
    const formData = customerRegisterNormalize(data, sessionId);
    const response = await Api.post('/ConnectorCustomers', formData);
    return response;
  }
};

export async function customerEdit(values) {
  const {customerId, data} = values;

  const formData = customerEditNormalize(data);
  const response = await Api.put(`/ConnectorCustomers/${customerId}`, formData);
  if (response.data.id > 0) {
    return true;
  } else {
    return false;
  }
}

export async function passwordEdit(data) {
  const formData = passwordEditNormalize(data);
  const response = await Api.put(`/ConnectorCustomers/${data.id}`, formData);

  if (response.data.id > 0) {
    return true;
  } else {
    return false;
  }
}

export async function userLogin(values) {
  const {email, password} = values;
  const response = await Api.get(`/ConnectorCustomers?filter[email]=${email}`);
  const [user] = response.data;
  const hash = user.hashPassword;
  if (user) {
    if (user.encoderName === 'md5') {
      const checked = checkMd5Pass(password);
      return checked ? user : false;
    }
    if (user.encoderName === 'bcrypt') {
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
