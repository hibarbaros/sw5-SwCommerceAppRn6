import Api from '../api';
import {
  addressAddNormalize,
  addressEditNormalize,
} from '../normalize/addressNormalize';

export async function addressDetail(addressId) {
  const address = await Api.get(`/addresses/${addressId}`);
  return address.data;
}

export async function addressAddEdit(values) {
  if (values.userAddressId) {
    const formData = addressEditNormalize(values);
    const response = await Api.put(
      `/ConnectorAddress/${values.userAddressId}`,
      formData,
    );
    return response.data?.id ? true : false;
  } else {
    const formData = addressAddNormalize(values);
    const response = await Api.post('/addresses', formData);
    return response.data?.id ? true : false;
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
