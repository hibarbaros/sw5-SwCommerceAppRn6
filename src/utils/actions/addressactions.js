import Api from '../api';
import {
  addressAddNormalize,
  addressEditNormalize,
} from '../normalize/address-normalize';

export async function addressDetail(addressId) {
  const address = await Api.get(`/addresses/${addressId}`);
  return address.data;
}

export async function addressAdd(data) {
  const formData = addressAddNormalize(data);
  const response = await Api.post('/addresses', formData);
  if (response.data.id > 0) {
    return true;
  } else {
    return false;
  }
}

export async function addressEdit(data) {
  const formData = addressEditNormalize(data);
  const response = await Api.put(
    `/ConnectorAddress/${data.userAddress.id}`,
    formData,
  );
  if (response.data.id > 0) {
    return true;
  } else {
    return false;
  }
}

export async function addressDelete(addressId) {
  const response = await Api.delete(`/addresses/${addressId}`);
  if (response.success) {
    return true;
  } else {
    return false;
  }
}

export default {
  addressDetail,
  addressDelete,
  addressAdd,
  addressEdit,
};
