export function addressAddNormalize(data) {
  //TODO: salutation dinamik yapilmali
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
  return formData;
}

export function addressEditNormalize(data) {
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
  return formData;
}
