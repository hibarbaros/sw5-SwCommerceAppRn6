import React, {useState, useContext} from 'react';
import {TouchableWithoutFeedback} from 'react-native';
import {Icon, Input, Button} from '@ui-kitten/components';

import {View} from 'react-native-ui-lib';
import {useNavigation} from '@react-navigation/native';
import {Formik, getIn} from 'formik';
import * as yup from 'yup';

import {LocalizationContext} from '../../../context/Translations';
import {FormErrorLabel} from '../../../themes/components';
import {EmailIcon, ForwardIcon} from '../../../themes/components/IconSet';
import {useCustomerLogin} from '../../../utils/hooks/useCustomer';

import LoadSpinner from '../../Common/LoadSpinner';

export default function UserLoginForm({modalVisible = false}) {
  const navigation = useNavigation();

  const {mutate, isLoading} = useCustomerLogin();

  const {translations} = useContext(LocalizationContext);
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const renderIcon = (props) => (
    <TouchableWithoutFeedback
      onPress={() => setSecureTextEntry(!secureTextEntry)}>
      <Icon {...props} name={secureTextEntry ? 'eye-off' : 'eye'} />
    </TouchableWithoutFeedback>
  );

  function handleLogin(values) {
    mutate(values, {
      onSuccess: () => {
        modalVisible ? modalVisible() : navigation.goBack();
      },
    });
  }

  return (
    <>
      <LoadSpinner isVisible={isLoading} />
      <Formik
        initialValues={{
          email: 'pixtanbul@gmail.com',
          password: '2003980016Bbb',
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
