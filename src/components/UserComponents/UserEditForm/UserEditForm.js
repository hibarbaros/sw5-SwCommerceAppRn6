import React, {useState, useContext} from 'react';
import {View} from 'react-native-ui-lib';
import {Button, CheckBox} from '@ui-kitten/components';

import {useEditCustomer} from '../../../utils/hooks/useCustomer';
import LoadSpinner from '../../../components/Common/LoadSpinner/LoadSpinner';
import {LocalizationContext} from '../../../context/Translations';
import {Container, FormInput} from '../../../themes/components';
import {ForwardIcon} from '../../../themes/components/IconSet';
import {Formik, Field} from 'formik';
import * as yup from 'yup';

export default function UserEditForm({userData}) {
  const {translations} = useContext(LocalizationContext);
  const [userNewsletter, setUserNewsletter] = useState(userData.newsletter);

  const {
    mutate: mutateEditCustomer,
    isLoading: editCustomerLoading,
  } = useEditCustomer();

  function handleForm(values) {
    mutateEditCustomer({customerId: userData.id, values});
  }
  return (
    <>
      <LoadSpinner isVisible={editCustomerLoading} />
      <Container>
        <Formik
          initialValues={{
            email: userData.email,
            firstname: userData.firstname,
            lastname: userData.lastname,
            newsletter: userData.newsletter,
            salutation: userData.salutation,
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
