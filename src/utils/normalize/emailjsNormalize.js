const serviceID = 'service_fk4mc8q';
const templateID = 'forgot_template_jtdc4n5';
const userId = 'user_8OENXlQHFqvmMnMJhmsZ2';

const formValues = {
  service_id: serviceID,
  template_id: templateID,
  user_id: userId,
};

export const forgotPasswordNormalize = (values) => {
  const allData = {
    ...formValues,
    template_params: {
      email: values.email,
    },
  };

  return allData;
};
