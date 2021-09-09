import React, { useState } from 'react';
import { Checkbox } from 'react-native-magnus';
import { Formik, Field } from 'formik';
import * as yup from 'yup';

import { useEditCustomer, useCustomerByCustomerId } from 'utils/hooks/useCustomer';

import LoadSpinner from 'components/Common/LoadSpinner';
import GenderActionSheet from 'components/Common/GenderActionSheet/GenderActionSheet';
import { useLocalizationContext } from 'context/Translations';
import { useAppContext } from 'context/AppContext';

import { Container, FormInput, Button, Text } from 'themes/components';

import { initialValues } from './initialValues';
import { validationSchema } from 'utils/validationSchema';

export default function UserEditForm() {
  const { user } = useAppContext();
  const { translations } = useLocalizationContext();

  const [initialNewsletter, setInitialNewsletter] = useState(false);

  const { mutate, isLoading: editCustomerLoading } = useEditCustomer();
  const { data, isLoading } = useCustomerByCustomerId(user, {
    onSuccess: (response) => {
      const isNewsletter = response.newsletter === 0 ? false : true;
      setInitialNewsletter(isNewsletter);
    }
  });

  function handleForm(values) {
    mutate({ customerId: data.id, values });
  }

  if (isLoading) {
    return <Text>Loading</Text>;
  }

  return (
    <>
      <LoadSpinner isVisible={editCustomerLoading} />
      <Container>
        <Formik
          enableReinitialize
          initialValues={{
            email: initialValues.email(data),
            firstname: initialValues.firstname(data),
            lastname: initialValues.lastname(data),
            newsletter: initialNewsletter ? '1' : '0',
            salutation: initialValues.salutation(data)
          }}
          onSubmit={(values) => handleForm(values)}
          validationSchema={yup.object().shape({
            firstname: validationSchema.textValidation('Firstname is a required filed'),
            lastname: validationSchema.textValidation('Lastname is a required filed'),
            salutation: validationSchema.textValidation('Salutation is a required filed')
          })}
        >
          {({ values, handleSubmit }) => (
            <>
              <Text variant="medium">E-mail : {values.email}</Text>
              <Field
                value={values.firstname}
                component={FormInput}
                name="firstname"
                placeholder={`${translations.firstname} *`}
              />
              <Field
                value={values.lastname}
                component={FormInput}
                name="lastname"
                placeholder={`${translations.lastname} *`}
              />
              <Field
                component={GenderActionSheet}
                name="salutation"
                salutationValue={data.salutation}
                placeholder="Gender Select"
              />
              <Checkbox value={values.newsletter}>
                {({ checked }) => <Text color={checked ? 'white' : 'gray800'}>Newsletter</Text>}
              </Checkbox>
              <Checkbox
                my={10}
                onChange={() => setInitialNewsletter(!initialNewsletter)}
                value={initialNewsletter}
                // defaultChecked={values.newsletter}
                suffix={<Text flex={1}>Newsletter</Text>}
              />
              <Button block text={translations.edit} onPress={handleSubmit} />
            </>
          )}
        </Formik>
      </Container>
    </>
  );
}
