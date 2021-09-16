import React, { useState } from 'react';
import { Div } from 'react-native-magnus';
import { Formik, Field } from 'formik';
import * as yup from 'yup';
//*components
import { FormInput, Button, TextButton, Container } from 'themes/components';
import LoadSpinner from 'components/Common/LoadSpinner';
//*utils
import { useCustomerLogin } from 'utils/hooks/useCustomer';
import { validationSchema } from 'utils/validationSchema';

import { initialValues } from './initialValues';

export default function UserLoginForm() {
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const { mutateAsync, isLoading } = useCustomerLogin();

  async function handleLogin(values) {
    await mutateAsync(values);
  }

  return (
    <>
      <LoadSpinner isVisible={isLoading} />
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => handleLogin(values)}
        validationSchema={yup.object().shape({
          email: validationSchema.emailValidation('E-mail is a required filed'),
          password: validationSchema.passwordValidation(
            'No password provided.',
            'Password is too short - should be 8 chars minimum.',
            'Password can only contain Latin letters.'
          )
        })}
      >
        {({ handleSubmit }) => (
          <Container>
            <Div>
              <Field component={FormInput} name="email" placeholder="E-Mail *" suffix="envelope" />
            </Div>
            <Div>
              <Field
                component={FormInput}
                secureTextEntry={secureTextEntry}
                name="password"
                placeholder="Password *"
              />
            </Div>
            <TextButton mb={10} onPress={() => setSecureTextEntry(!secureTextEntry)}>
              Show Password
            </TextButton>
            <Div mT={10}>
              <Button block text="Login" onPress={handleSubmit} />
            </Div>
          </Container>
        )}
      </Formik>
    </>
  );
}
