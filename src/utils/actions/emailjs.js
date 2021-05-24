import Api from '../api';
import {forgotPasswordNormalize} from '../normalize/emailjsNormalize';

export const forgotPassword = async (values) => {
  const formData = forgotPasswordNormalize(values);
  const response = await Api.post(
    'https://api.emailjs.com/api/v1.0/email/send',
    formData,
  );
  return response;
};
