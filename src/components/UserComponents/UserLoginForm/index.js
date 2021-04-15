import React from 'react';
import {Button} from '@ui-kitten/components';
import {View} from 'react-native-ui-lib';
import {useNavigation} from '@react-navigation/native';
import {Formik, Field} from 'formik';
import * as yup from 'yup';
import {ForwardIcon} from '../../../themes/components/IconSet';
//*components
import {FormInput} from '../../../themes/components';
import LoadSpinner from '../../Common/LoadSpinner';
//*utils
import {useCustomerLogin} from '../../../utils/hooks/useCustomer';
import {validationSchema} from '../../../utils/validationSchema';

import {initialValues} from './initialValues';

export default function UserLoginForm({modalVisible = false}) {
  const navigation = useNavigation();

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
            <View marginV-s2>
              <Field
                component={FormInput}
                name="email"
                placeholder="E-Mail *"
              />
            </View>
            <View marginV-s2>
              <Field
                component={FormInput}
                secureTextEntry={true}
                name="password"
                placeholder="Password *"
              />
            </View>
            <View marginV-s2>
              <Button
                appearance="outline"
                onPress={handleSubmit}
                accessoryRight={ForwardIcon}>
                Login
              </Button>
            </View>
          </>
        )}
      </Formik>
    </>
  );
}
