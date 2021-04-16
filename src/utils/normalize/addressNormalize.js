export function addressAddNormalize(data) {
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
  const formData = JSON.stringify({
    firstname: data.firstname,
    lastname: data.lastname,
    street: data.street,
    zipcode: data.zipcode,
    state: data.state,
    city: data.city,
    salutation: data.salutation,
    country: data.country,
  });
  return formData;
}
