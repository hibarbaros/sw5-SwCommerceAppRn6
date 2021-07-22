import React from 'react';
import { Formik, Field } from 'formik';
import * as yup from 'yup';

import { Container, FormInput, Button, Text } from 'themes/components';
import LoadSpinner from 'components/Common/LoadSpinner';

import { useAppContext } from 'context/AppContext';
import { useEditCustomerPassword, useCustomerByCustomerId } from 'utils/hooks/useCustomer';
import { validationSchema } from 'utils/validationSchema';

import { initialValues } from './initialValues';

export default function UserPasswordEditForm() {
  const { user } = useAppContext();

  const { data, isLoading } = useCustomerByCustomerId(user);
  const { mutate, isLoading: editPasswordLoading } = useEditCustomerPassword();

  if (isLoading) {
    return <Text>isLoading</Text>;
  }

  function handleLogin(values) {
    const { hashPassword, encoderName } = data;
    values.encoderName = encoderName;
    values.hashPassword = hashPassword;
    values.customer = data;
    mutate(values);
  }

  return (
    <Container>
      <LoadSpinner isVisible={editPasswordLoading} />
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => handleLogin(values)}
        validationSchema={yup.object().shape({
          oldPassword: validationSchema.passwordValidation(
            'No password provided.',
            'Password is too short - should be 8 chars minimum.',
            'Password can only contain Latin letters.'
          ),
          password: validationSchema.passwordValidation(
            'No password provided.',
            'Password is too short - should be 8 chars minimum.',
            'Password can only contain Latin letters.'
          ),
          confirmPassword: validationSchema.confirmpasswordValidation(
            'Both password need to be the same'
          )
        })}
      >
        {({ handleSubmit }) => (
          <>
            <Field
              // secureTextEntry={true}
              component={FormInput}
              name="oldPassword"
              placeholder="Old Password *"
            />
            <Field
              secureTextEntry={true}
              component={FormInput}
              name="password"
              placeholder="Password *"
            />
            <Field
              secureTextEntry={true}
              component={FormInput}
              name="confirmPassword"
              placeholder="Confirm password *"
            />
            <Button block text="Save" onPress={handleSubmit} />
          </>
        )}
      </Formik>
    </Container>
  );
}
