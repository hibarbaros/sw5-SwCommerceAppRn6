import React from 'react';
import {Text} from '@ui-kitten/components';
import {useNavigation, useRoute} from '@react-navigation/native';
import {View} from 'react-native-ui-lib';
import {useQueryClient} from 'react-query';
import {Formik, Field} from 'formik';
import * as yup from 'yup';

import {ForwardIcon} from '../../../themes/components/IconSet';
import {
  FormErrorLabel,
  KeyboardAwareScroll,
  Button,
  FormInput,
} from '../../../themes/components';
import CountryDropDown from '../../Common/CountryDropDown/CountryDropDown';
import LoadSpinner from '../../Common/LoadSpinner';
import {useAddAddress, useEditAddress} from '../../../utils/hooks/useAddress';

export default function UserAddressAddForm() {
  const navigation = useNavigation();
  const route = useRoute();
  const {userData, userAddress} = route.params;
  const cache = useQueryClient();

  const {mutate: addAddress, isLoading: isAddAddressLoading} = useAddAddress();
  const {
    mutate: editAddress,
    isLoading: isEditAddressLoading,
  } = useEditAddress();

  function handleEditAddress(values) {
    editAddress(values, {
      onSettled: () => {
        cache.invalidateQueries('userData');
      },
      onSuccess: (data) => {
        if (data) {
          cache.invalidateQueries('userData');
          navigation.goBack();
        }
      },
      throwOnError: true,
    });
  }

  function handleAddAddress(values) {
    addAddress(values, {
      onSettled: () => {
        cache.invalidateQueries('userData');
      },
      onSuccess: (data) => {
        if (data) {
          cache.invalidateQueries('userData');
          navigation.goBack();
        }
      },
      throwOnError: true,
    });
  }

  function handleForm(values) {
    if (userAddress) {
      handleEditAddress({values, userAddress});
    } else {
      values.customer = userData.id;
      userAddress ? handleEditAddress(values) : handleAddAddress(values);
    }
  }

  return (
    <>
      <LoadSpinner isVisible={isAddAddressLoading || isEditAddressLoading} />
      <KeyboardAwareScroll>
        <>
          <Text>Address Add Form</Text>
          <Formik
            initialValues={{
              firstname: userAddress ? userAddress.firstname : '',
              lastname: userAddress ? userAddress.lastname : '',
              street: userAddress ? userAddress.street : '',
              zipcode: userAddress ? userAddress.zipcode : '',
              city: userAddress ? userAddress.city : '',
              state: userAddress ? userAddress.state : '',
              country: userAddress ? userAddress.country : '',
            }}
            onSubmit={(values) => handleForm(values)}
            validationSchema={yup.object().shape({
              firstname: yup.string().required(),
              lastname: yup.string().required(),
              street: yup.string().required(),
              zipcode: yup.number().required(),
              city: yup.string().required(),
              country: yup.string().required(),
            })}>
            {({
              values,
              handleChange,
              errors,
              setFieldTouched,
              touched,
              isValid,
              handleSubmit,
              setFieldValue,
            }) => (
              <>
                <View marginV-s2>
                  <Field
                    component={FormInput}
                    name="firstname"
                    placeholder="Firstname *"
                  />
                </View>
                <View marginV-s2>
                  <Field
                    component={FormInput}
                    name="lastname"
                    placeholder="Lastname *"
                  />
                </View>
                <View marginV-s2>
                  <Field
                    component={FormInput}
                    name="street"
                    placeholder="Street *"
                  />
                </View>
                <View marginV-s2>
                  <Field
                    component={FormInput}
                    name="zipcode"
                    placeholder="Zipcode *"
                  />
                </View>
                <View marginV-s2>
                  <Field
                    component={FormInput}
                    name="city"
                    placeholder="City *"
                  />
                </View>
                <View marginV-s2>
                  <Field
                    component={FormInput}
                    name="state"
                    placeholder="State *"
                  />
                </View>
                <View marginV-s2>
                  <CountryDropDown
                    userAddress={userAddress}
                    onPress={(countryId) => {
                      setFieldValue('country', countryId);
                    }}
                  />
                  {touched.country && errors.country && (
                    <FormErrorLabel errorMessage={errors.country} />
                  )}
                </View>
                <View marginV-s2>
                  <Button
                    appearance="primary"
                    text={userAddress ? 'Edit Address' : 'Add Address'}
                    onPress={handleSubmit}
                    accessoryRight={ForwardIcon}
                  />
                </View>
              </>
            )}
          </Formik>
        </>
      </KeyboardAwareScroll>
    </>
  );
}
