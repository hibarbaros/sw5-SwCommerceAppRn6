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
    // kullanici var
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

export async function cartMigrate(sessionId, userId, userSessionId) {
  console.log(
    '🚀 ~ file: useractions.js ~ line 53 ~ cartMigrate ~ sessionId, userId, userSessionId',
    sessionId,
    userId,
    userSessionId,
  );
  const response = await Api.get(
    `/ConnectorBasket?migrate=1&sessionId=${sessionId}&userId=${userId}&userSessionId=${userSessionId}`,
  );
  // const response = await Api.get(
  //   `/ConnectorBasket?migrate=1&sessionId=6F426E50-3B3B-4C19-B3DA-68B087819A66&userId=16`,
  // );
  return response;
}

export async function userLogin(values, sessionId) {
  const {email, password} = values;
  const response = await Api.get(`/ConnectorCustomers?filter[email]=${email}`);
  const {data} = response;
  const userSessionId = data[0].sessionId;
  const userId = data[0].id;
  const hash = data[0].hashPassword;
  if (data.length > 0) {
    if (data[0].encoderName === 'md5') {
      const checked = checkMd5Pass(password);
      if (checked) {
        const migrated = await cartMigrate(sessionId, userId, userSessionId);
        return migrated ? data[0] : false;
      }
    }
    if (data[0].encoderName === 'bcrypt') {
      const checked = checkBcryptPass(password, hash);
      console.log(
        '🚀 ~ file: useractions.js ~ line 85 ~ userLogin ~ checked',
        checked,
      );
      if (checked) {
        const migrated = await cartMigrate(sessionId, userId, userSessionId);
        return migrated ? data[0] : false;
      }
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
