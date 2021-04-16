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
import GenderActionSheet from '../../Common/GenderActionSheet/GenderActionSheet';
import {LocalizationContext} from '../../../context/Translations';
import AppContext from '../../../context/AppContext';

import {Container, FormInput} from '../../../themes/components';
import {ForwardIcon} from '../../../themes/components/IconSet';

import {initialValues} from './initialValues';
import {validationSchema} from '../../../utils/validationSchema';

export default function UserEditForm() {
  const [userNewsletter, setUserNewsletter] = useState(null);
  const {translations} = useContext(LocalizationContext);
  const {user} = useContext(AppContext);
  const {data, isLoading} = useCustomerByCustomerId(user, {
    onSuccess: () => {
      setUserNewsletter(data.newsletter);
    },
  });

  const {mutate, isLoading: editCustomerLoading} = useEditCustomer();

  function handleForm(values) {
    mutate({customerId: data.id, values});
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
            email: initialValues.email(data),
            firstname: initialValues.firstname(data),
            lastname: initialValues.lastname(data),
            newsletter: initialValues.newsletter(data),
            salutation: initialValues.salutation(data),
          }}
          onSubmit={(values) => handleForm(values)}
          validationSchema={yup.object().shape({
            email: validationSchema.textValidation('Email is a required filed'),
            firstname: validationSchema.textValidation(
              'Firstname is a required filed',
            ),
            lastname: validationSchema.textValidation(
              'Lastname is a required filed',
            ),
            salutation: validationSchema.textValidation(
              'Salutation is a required filed',
            ),
          })}>
          {({values, handleSubmit}) => (
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
                <Field
                  component={GenderActionSheet}
                  name="salutation"
                  salutationValue={data.salutation}
                  placeholder="Gender Select"
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
