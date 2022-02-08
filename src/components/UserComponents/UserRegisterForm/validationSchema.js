import { validationSchema } from 'utils/validationSchema';

export const schema = {
  email: validationSchema.emailValidation('E-mail is a required filed'),
  password: validationSchema.passwordValidation(
    'No password provided.',
    'Password is too short - should be 8 chars minimum.',
    'Password can only contain Latin letters.'
  ),
  confirmpassword: validationSchema.confirmpasswordValidation('Both password need to be the same'),
  firstname: validationSchema.textValidation('Firstname is a required filed'),
  lastname: validationSchema.textValidation('Lastname is a required filed'),
  salutation: validationSchema.textValidation('Salutation is a required filed'),
  newsletter: validationSchema.newsletterValidation,
  billingfirstname: validationSchema.textValidation('Billing Firstname is a required filed'),
  billinglastname: validationSchema.textValidation('Billing Lastname is a required filed'),
  billingsalutation: validationSchema.textValidation('Billing Salutation is a required filed'),
  billingstreet: validationSchema.textValidation('Billing Street is a required filed'),
  billingstate: validationSchema.textValidation('Billing State is a required filed'),
  billingzipcode: validationSchema.textValidation('Billing Zip Code is a required filed'),
  billingcity: validationSchema.textValidation('Billing City is a required filed'),
  billingcountry: validationSchema.textValidation('Billing Country is a required filed'),
  isShipping: validationSchema.isShippingValidation,
  shippingfirstname: validationSchema.isShippingTrue('Shipping Firstname is a required filed'),
  shippinglastname: validationSchema.isShippingTrue('Shipping Lastname is a required filed'),
  shippingsalutation: validationSchema.isShippingTrue('Shipping Salutation is a required filed'),
  shippingstreet: validationSchema.isShippingTrue('Shipping Street is a required filed'),
  shippingstate: validationSchema.isShippingTrue('Shipping State is a required filed'),
  shippingzipcode: validationSchema.isShippingTrue('Shipping Zip Code is a required filed'),
  shippingcity: validationSchema.isShippingTrue('Shipping City is a required filed'),
  shippingcountry: validationSchema.isShippingTrue('Shipping Country is a required filed')
};
