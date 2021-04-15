import * as yup from 'yup';

export const validationSchema = {
  emailValidation: (text) => yup.string().email().required(text),
  passwordValidation: (text, minText, matchesText) =>
    yup
      .string()
      .required(text)
      .min(8, minText)
      .matches(/[a-zA-Z]/, matchesText),
  confirmpasswordValidation: (text) =>
    yup.string().when('password', {
      is: (val) => (val && val.length > 0 ? true : false),
      then: yup.string().oneOf([yup.ref('password')], text),
    }),
  textValidation: (text) => yup.string().required(text),
  newsletterValidation: yup.bool(),
  isShippingValidation: yup.boolean(),
  isShippingTrue: (text) =>
    yup.string().when('isShipping', {
      is: true,
      then: yup.string().required(text),
    }),
};
