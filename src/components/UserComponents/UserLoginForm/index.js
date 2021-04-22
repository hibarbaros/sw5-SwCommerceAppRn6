import React, {useState} from 'react';
import {Div} from 'react-native-magnus';
import {useNavigation} from '@react-navigation/native';
import {Formik, Field} from 'formik';
import * as yup from 'yup';
//*components
import {FormInput, Button, TextButton} from '../../../themes/components';
import LoadSpinner from '../../Common/LoadSpinner';
//*utils
import {useCustomerLogin} from '../../../utils/hooks/useCustomer';
import {validationSchema} from '../../../utils/validationSchema';

import {initialValues} from './initialValues';

export default function UserLoginForm({modalVisible = false}) {
  const navigation = useNavigation();
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const {mutateAsync, isLoading} = useCustomerLogin();

  // const renderIcon = (props) => (
  //   <TouchableWithoutFeedback
  //     onPress={() => setSecureTextEntry(!secureTextEntry)}>
  //     <Icon {...props} name={secureTextEntry ? 'eye-off' : 'eye'} />
  //   </TouchableWithoutFeedback>
  // );

  async function handleLogin(values) {
    await mutateAsync(values);
    modalVisible ? modalVisible() : navigation.goBack();
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
            'Password can only contain Latin letters.',
          ),
        })}>
        {({handleSubmit}) => (
          <>
            <Div my={10}>
              <Field
                component={FormInput}
                name="email"
                placeholder="E-Mail *"
                suffix="envelope"
              />
            </Div>
            <Div my={10}>
              <Field
                component={FormInput}
                secureTextEntry={secureTextEntry}
                name="password"
                placeholder="Password *"
              />
            </Div>
            <TextButton
              mb={10}
              onPress={() => setSecureTextEntry(!secureTextEntry)}>
              Show Password
            </TextButton>
            <Div mT={10}>
              <Button block text="Login" onPress={handleSubmit} />
            </Div>
          </>
        )}
      </Formik>
    </>
  );
}
