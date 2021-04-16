import React, {useContext} from 'react';
import {Button} from '@ui-kitten/components';
import {View, Text} from 'react-native-ui-lib';
import {Formik, Field} from 'formik';
import * as yup from 'yup';

import {Container, FormInput} from '../../../themes/components';
import {ForwardIcon} from '../../../themes/components/IconSet';
import LoadSpinner from '../../Common/LoadSpinner';

import AppContext from '../../../context/AppContext';
import {
  useEditCustomerPassword,
  useCustomerByCustomerId,
} from '../../../utils/hooks/useCustomer';

import {initialValues} from './initialValues';

import {validationSchema} from '../../../utils/validationSchema';

export default function UserPasswordEditForm() {
  const {user} = useContext(AppContext);
  const {data, isLoading} = useCustomerByCustomerId(user);
  const {mutate, isLoading: editPasswordLoading} = useEditCustomerPassword();

  if (isLoading) {
    return <Text>isLoading</Text>;
  }

  function handleLogin(values) {
    const {hashPassword, encoderName} = data;
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
            'Password can only contain Latin letters.',
          ),
          password: validationSchema.passwordValidation(
            'No password provided.',
            'Password is too short - should be 8 chars minimum.',
            'Password can only contain Latin letters.',
          ),
          confirmPassword: validationSchema.confirmpasswordValidation(
            'Both password need to be the same',
          ),
        })}>
        {({handleSubmit}) => (
          <>
            <View marginV-s2>
              <Field
                // secureTextEntry={true}
                component={FormInput}
                name="oldPassword"
                placeholder="Old Password *"
              />
            </View>
            <View marginV-s2>
              <Field
                secureTextEntry={true}
                component={FormInput}
                name="password"
                placeholder="Password *"
              />
            </View>
            <View marginV-s2>
              <Field
                secureTextEntry={true}
                component={FormInput}
                name="confirmPassword"
                placeholder="Confirm password *"
              />
            </View>
            <View marginV-s2>
              <Button
                appearance="outline"
                onPress={handleSubmit}
                accessoryRight={ForwardIcon}>
                Save
              </Button>
            </View>
          </>
        )}
      </Formik>
    </Container>
  );
}
