import React, {useState, useContext} from 'react';
import {TouchableWithoutFeedback} from 'react-native';
import {Icon, Input, Button} from '@ui-kitten/components';

import {View} from 'react-native-ui-lib';
import Toast from 'react-native-toast-message';
import {useNavigation} from '@react-navigation/native';
import {Formik, getIn} from 'formik';
import * as yup from 'yup';
import md5 from 'react-native-md5';
import bcrypt from 'react-native-bcrypt';

import {LocalizationContext} from '../../../context/Translations';
import {FormErrorLabel} from '../../../themes/components';
import {EmailIcon, ForwardIcon} from '../../../themes/components/IconSet';
import AppContext from '../../../context/AppContext';
import {setUserStorage} from '../../../utils/actions/useractions';
import {useCustomerCheckByMail} from '../../../utils/hooks/useCustomer';

import LoadSpinner from '../../Common/LoadSpinner';

export default function UserLoginForm() {
  const navigation = useNavigation();

  const {mutate: checkUserMutate, isLoading} = useCustomerCheckByMail();

  const {setUser} = useContext(AppContext);
  const {translations} = useContext(LocalizationContext);
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const renderIcon = (props) => (
    <TouchableWithoutFeedback
      onPress={() => setSecureTextEntry(!secureTextEntry)}>
      <Icon {...props} name={secureTextEntry ? 'eye-off' : 'eye'} />
    </TouchableWithoutFeedback>
  );

  function passwordCheck(password, data) {
    const {id, hashPassword} = data;
    let checkUserPassword;
    if (data.encoderName === 'md5') {
      checkUserPassword = md5.hex_md5(password);
    }
    if (data.encoderName === 'bcrypt') {
      checkUserPassword = bcrypt.compareSync(password, hashPassword);
    }
    if (checkUserPassword) {
      setUser(1);
      setUserStorage(id);
      navigation.goBack();
    }
    if (!checkUserPassword) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: translations.passwordFalsch,
      });
    }
  }

  function handleLogin(values) {
    checkUserMutate(values, {
      onSuccess: (data) => passwordCheck(values.password, data),
    });
  }

  return (
    <>
      <LoadSpinner isVisible={isLoading} />
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        onSubmit={(values) => handleLogin(values)}
        validationSchema={yup.object().shape({
          email: yup.string().email().required(),
          password: yup.string().required('No password provided.'),
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
              <Input
                value={values.email}
                onChangeText={handleChange('email')}
                onBlur={() => setFieldTouched('email')}
                accessoryRight={EmailIcon}
                size="large"
                placeholder="E-Mail"
                label="E-Mail *"
              />
              {getIn(errors, 'email') && getIn(touched, 'email') && (
                <FormErrorLabel errorMessage={errors.email} />
              )}
            </View>
            <View marginV-s2>
              <Input
                value={values.password}
                accessoryRight={renderIcon}
                size="large"
                secureTextEntry={secureTextEntry}
                onChangeText={handleChange('password')}
                onBlur={() => setFieldTouched('password')}
                placeholder={translations.passwordInput}
                label="Password"
              />
              {getIn(errors, 'password') && getIn(touched, 'password') && (
                <FormErrorLabel errorMessage={errors.password} />
              )}
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
