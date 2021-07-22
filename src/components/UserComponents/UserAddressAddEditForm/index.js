import React from 'react';
import { useRoute } from '@react-navigation/native';
import { Formik, Field } from 'formik';
import * as yup from 'yup';

import { KeyboardAwareScroll, Button, FormInput, Text } from 'themes/components';

import CountryDropDown from 'components/Common/CountryDropDown/CountryDropDown';
import GenderActionSheet from 'components/Common/GenderActionSheet/GenderActionSheet';
import LoadSpinner from 'components/Common/LoadSpinner';

import { useAddEditAddress } from 'utils/hooks/useAddress';
import { validationSchema } from 'utils/validationSchema';

import { initialValues } from './initialValues';

export default function UserAddressAddEditForm() {
  const route = useRoute();
  const { userData, userAddress } = route.params;

  const { mutate, isLoading } = useAddEditAddress();

  function handleForm(values) {
    values.customer = userData.id;
    if (userAddress) {
      values.userAddressId = parseFloat(userAddress.id);
    }
    mutate(values);
  }

  return (
    <>
      <LoadSpinner isVisible={isLoading} />
      <KeyboardAwareScroll>
        <>
          <Text>Address Add Form</Text>
          <Formik
            initialValues={{
              firstname: initialValues.firstname(userAddress),
              lastname: initialValues.lastname(userAddress),
              street: initialValues.street(userAddress),
              salutation: initialValues.salutation(userAddress),
              zipcode: initialValues.zipcode(userAddress),
              city: initialValues.city(userAddress),
              state: initialValues.state(userAddress),
              country: initialValues.country(userAddress?.country_id)
            }}
            onSubmit={(values) => handleForm(values)}
            validationSchema={yup.object().shape({
              firstname: validationSchema.textValidation('Firstname is a required filed'),
              lastname: validationSchema.textValidation('Lastname is a required filed'),
              salutation: validationSchema.textValidation('Salutation is a required filed'),
              street: validationSchema.textValidation('street is a required filed'),
              zipcode: validationSchema.textValidation('zipcode is a required filed'),
              city: validationSchema.textValidation('City is a required filed'),
              country: validationSchema.textValidation('Country is a required filed')
            })}
          >
            {({ handleSubmit }) => (
              <>
                <Field component={FormInput} name="firstname" placeholder="Firstname *" />
                <Field component={FormInput} name="lastname" placeholder="Lastname *" />
                <Field
                  component={GenderActionSheet}
                  name="salutation"
                  salutationValue={userAddress?.salutation}
                  placeholder="Gender Select"
                />
                <Field component={FormInput} name="street" placeholder="Street *" />
                <Field component={FormInput} name="zipcode" placeholder="Zipcode *" />
                <Field component={FormInput} name="city" placeholder="City *" />
                <Field component={FormInput} name="state" placeholder="State *" />
                <Field
                  component={CountryDropDown}
                  countryId={userAddress?.country_id}
                  name="country"
                  placeholder="Select Country"
                />
                <Button
                  block
                  text={userAddress ? 'Edit Address' : 'Add Address'}
                  onPress={handleSubmit}
                />
              </>
            )}
          </Formik>
        </>
      </KeyboardAwareScroll>
    </>
  );
}
