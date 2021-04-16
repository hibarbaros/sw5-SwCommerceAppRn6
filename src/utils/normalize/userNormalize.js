export function customerRegisterNormalize(data, sessionId) {
  const {
    email,
    password,
    firstname,
    lastname,
    salutation,
    newsletter,
    billingfirstname,
    billinglastname,
    billingsalutation,
    billingstreet,
    billingcity,
    billingstate,
    billingzipcode,
    billingcountry,
    shippingfirstname,
    shippinglastname,
    shippingsalutation,
    shippingstreet,
    shippingcity,
    shippingstate,
    shippingzipcode,
    shippingcountry,
    doubleOptinRegister,
    sendOptinMail,
  } = data;
  const billing = {
    firstname: billingfirstname,
    lastname: billinglastname,
    salutation: billingsalutation,
    street: billingstreet,
    state: billingstate,
    zipcode: billingzipcode,
    city: billingcity,
    country: billingcountry,
  };
  let shipping;
  if (!data.isShipping) {
    shipping = billing;
  } else {
    shipping = {
      firstname: shippingfirstname,
      lastname: shippinglastname,
      salutation: shippingsalutation,
      street: shippingstreet,
      state: shippingstate,
      zipcode: shippingzipcode,
      city: shippingcity,
      country: shippingcountry,
    };
  }
  const allData = {
    email,
    password,
    firstname,
    lastname,
    sessionId,
    salutation,
    newsletter,
    billing,
    shipping,
    doubleOptinRegister,
    sendOptinMail,
  };
  const formData = JSON.stringify({
    ...allData,
  });
  return formData;
}

export function customerEditNormalize(data) {
  const formData = JSON.stringify({
    firstname: data.firstname,
    lastname: data.lastname,
    salutation: data.salutation,
    email: data.email,
    sendOptinMail: false,
  });
  return formData;
}

export function passwordEditNormalize(customer, hash) {
  const allData = {
    firstname: customer.firstname,
    lastname: customer.lastname,
    salutation: customer.salutation,
    email: customer.email,
    hashPassword: hash,
    sendOptinMail: false,
  };
  const formData = JSON.stringify({
    ...allData,
  });
  return formData;
}
