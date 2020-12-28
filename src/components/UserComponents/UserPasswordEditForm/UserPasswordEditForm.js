import React, {useContext} from 'react';
import {Button} from '@ui-kitten/components';
import {View} from 'react-native-ui-lib';
import md5 from 'react-native-md5';
import bcrypt from 'react-native-bcrypt';
import Toast from 'react-native-toast-message';
import {Formik, Field} from 'formik';
import * as yup from 'yup';

import {Container, FormInput} from '../../../themes/components';
import {ForwardIcon} from '../../../themes/components/IconSet';
import LoadSpinner from '../../Common/LoadSpinner/LoadSpinner';

import {LocalizationContext} from '../../../context/Translations';
import {useEditCustomerPassword} from '../../../utils/hooks/useCustomer';

export default function UserPasswordEditForm({customerData}) {
  const {translations} = useContext(LocalizationContext);
  const {
    mutate: mutateEditPassword,
    isLoading: editPasswordLoading,
  } = useEditCustomerPassword();

  const handleChangePassword = (newPassword) => {
    customerData.hashPassword = newPassword;
    mutateEditPassword(customerData, {
      onSuccess: (data) => {
        if (data) {
          console.log('data', data);
        }
      },
    });
  };

  function passwordCheck(oldPassword, newPassword) {
    const {hashPassword, encoderName} = customerData;
    let checkUserPassword;
    if (encoderName === 'md5') {
      checkUserPassword = md5.hex_md5(oldPassword);
    }
    if (encoderName === 'bcrypt') {
      checkUserPassword = bcrypt.compareSync(oldPassword, hashPassword);
    }
    if (checkUserPassword) {
      const hash = bcrypt.hashSync('123456Bbb', 12);
      handleChangePassword(hash);
    }
    if (!checkUserPassword) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: translations.oldPasswordFalsch,
      });
    }
  }

  function handleLogin(values) {
    passwordCheck(values.oldPassword, values.password);
  }

  return (
    <Container>
      <LoadSpinner isVisible={editPasswordLoading} />
      <Formik
        initialValues={{
          oldPassword: '2003980016Bbb',
          password: '123456Bbb',
          confirmPassword: '123456Bbb',
        }}
        onSubmit={(values) => handleLogin(values)}
        validationSchema={yup.object().shape({
          oldPassword: yup
            .string()
            .required('No password provided.')
            .min(8, 'Password is too short - should be 8 chars minimum.')
            .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
          password: yup
            .string()
            .required('No password provided.')
            .min(8, 'Password is too short - should be 8 chars minimum.')
            .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
          confirmPassword: yup.string().when('password', {
            is: (val) => (val && val.length > 0 ? true : false),
            then: yup
              .string()
              .oneOf(
                [yup.ref('password')],
                'Both password need to be the same',
              ),
          }),
        })}>
        {({
          values,
          handleChange,
          errors,
          setFieldTouched,
          touched,
          handleSubmit,
        }) => (
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
                Login
              </Button>
            </View>
          </>
        )}
      </Formik>
    </Container>
  );
}
