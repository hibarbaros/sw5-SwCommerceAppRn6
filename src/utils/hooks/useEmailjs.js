import {useMutation} from 'react-query';
import Toast from 'react-native-toast-message';

import {forgotPassword} from '../actions/emailjs';

const getForgotPassword = async (templateParams) => {
  const data = await forgotPassword(templateParams);
  return data;
};

export function useForgotPassword() {
  const mutate = useMutation((values) => getForgotPassword(values), {
    onSuccess: (data) => {
      console.log(`data`, data);
      if (data) {
        return data;
      }
      if (!data) {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'error',
        });
      }
    },
  });

  return mutate;
}
