import React, {useState, useContext} from 'react';
import {View, Text} from 'react-native-ui-lib';
import {Button, CheckBox} from '@ui-kitten/components';
import {Formik, Field} from 'formik';
import * as yup from 'yup';

import {
  useEditCustomer,
  useCustomerByCustomerId,
} from '../../../utils/hooks/useCustomer';

import LoadSpinner from '../../Common/LoadSpinner';
import {LocalizationContext} from '../../../context/Translations';
import AppContext from '../../../context/AppContext';

import {Container, FormInput} from '../../../themes/components';
import {ForwardIcon} from '../../../themes/components/IconSet';

export default function UserEditForm() {
  const [userNewsletter, setUserNewsletter] = useState(null);
  const {translations} = useContext(LocalizationContext);
  const {user} = useContext(AppContext);
  const {data: customerData, isLoading} = useCustomerByCustomerId(user, {
    onSuccess: () => {
      setUserNewsletter(customerData.newsletter);
    },
  });

  const {
    mutate: mutateEditCustomer,
    isLoading: editCustomerLoading,
  } = useEditCustomer();

  function handleForm(values) {
    mutateEditCustomer({customerId: customerData.id, values});
  }

  if (isLoading) {
    return <Text>Loading</Text>;
  }

  return (
    <>
      <LoadSpinner isVisible={editCustomerLoading} />
      <Container>
        <Formik
          initialValues={{
            email: customerData.email,
            firstname: customerData.firstname,
            lastname: customerData.lastname,
            newsletter: customerData.newsletter,
            salutation: customerData.salutation,
          }}
          onSubmit={(values) => handleForm(values)}
          validationSchema={yup.object().shape({
            email: yup.string().email().required(),
            firstname: yup.string().required(),
            lastname: yup.string().required(),
          })}>
          {({
            values,
            handleChange,
            errors,
            setFieldTouched,
            touched,
            isValid,
            handleSubmit,
          }) => (
            <>
              <View marginV-s2>
                <Field
                  value={values.email}
                  component={FormInput}
                  name="email"
                  placeholder={`${translations.email} *`}
                />
              </View>
              <View marginV-s2>
                <Field
                  value={values.firstname}
                  component={FormInput}
                  name="firstname"
                  placeholder={`${translations.firstname} *`}
                />
              </View>
              <View marginV-s2>
                <Field
                  value={values.lastname}
                  component={FormInput}
                  name="lastname"
                  placeholder={`${translations.lastname} *`}
                />
              </View>
              <View marginV-s2>
                <CheckBox
                  checked={userNewsletter === 0 ? false : true}
                  onChange={() => {
                    setUserNewsletter(userNewsletter === 0 ? 1 : 0);
                  }}>
                  {'Newsletter'}
                </CheckBox>
              </View>
              <View marginV-s2>
                <Button
                  appearance="outline"
                  onPress={handleSubmit}
                  disabled={!isValid}
                  accessoryRight={ForwardIcon}>
                  {translations.edit}
                </Button>
              </View>
            </>
          )}
        </Formik>
      </Container>
    </>
  );
}
