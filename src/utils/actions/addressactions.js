import Api from '../api';

export async function addressDetail(addressId) {
  const address = await Api.get(`/addresses/${addressId}`);
  return address.data;
}

export async function addressAdd(data) {
  data.salutation = 'mr';
  const formData = JSON.stringify({
    firstname: data.firstname,
    lastname: data.lastname,
    street: data.street,
    zipcode: data.zipcode,
    city: data.city,
    state: data.state,
    salutation: data.salutation,
    country: data.country,
    customer: data.customer,
  });

  const response = await Api.post('/addresses', formData);
  if (response.data.id > 0) {
    return true;
  } else {
    return false;
  }
}

export async function addressEdit(data) {
  const {values, userAddress} = data;
  const formData = JSON.stringify({
    firstname: values.firstname,
    lastname: values.lastname,
    street: values.street,
    zipcode: values.zipcode,
    state: values.state,
    city: values.city,
    salutation: userAddress.salutation,
    country: values.country,
  });
  const response = await Api.put(
    `/ConnectorAddress/${userAddress.id}`,
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
  if (response.success === true) {
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
