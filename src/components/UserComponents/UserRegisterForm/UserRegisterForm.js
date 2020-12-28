import React, {useContext} from 'react';
import {StackActions, useNavigation} from '@react-navigation/native';
import {View} from 'react-native-ui-lib';
import {Formik, Field} from 'formik';
import * as yup from 'yup';

import {ForwardIcon} from '../../../themes/components/IconSet';
import {
  FormErrorLabel,
  KeyboardAwareScroll,
  Container,
  FormInput,
  Headline,
  CheckBox,
} from '../../../themes/components';
import AppContext from '../../../context/AppContext';
import AppRoutes from '../../../utils/approutes';
import {useRegisterCustomer} from '../../../utils/hooks/useCustomer';
import GenderActionSheet from '../../Common/GenderActionSheet/GenderActionSheet';
import CountryDropDown from '../../Common/CountryDropDown/CountryDropDown';
import LoadSpinner from '../../Common/LoadSpinner/LoadSpinner';

import {Styled} from './styles';

export default function UserRegisterForm() {
  const {setUser} = useContext(AppContext);
  const navigation = useNavigation();

  const {
    mutate: addCustomerLoading,
    isLoading: mutateAddCustomer,
  } = useRegisterCustomer();

  function handlePress(value) {
    mutateAddCustomer(value, {
      onSuccess: (data, variables, context) => {
        if (data) {
          setUser(data.data.id);
          navigation.dispatch(StackActions.replace(AppRoutes.PROFILE));
        }
      },
    });
  }

  return (
    <>
      <LoadSpinner isVisible={addCustomerLoading} />
      <KeyboardAwareScroll>
        <Container>
          <Formik
            initialValues={{
              email: '',
              password: '',
              firstname: '',
              lastname: '',
              salutation: 'mr',
              newsletter: false,
              billingfirstname: '',
              billinglastname: '',
              billingsalutation: 'mr',
              billingstreet: '',
              billingcity: '',
              billingstate: '',
              billingzipcode: 0,
              billingcountry: 0,
              isShipping: false,
              shippingfirstname: '',
              shippinglastname: '',
              shippingsalutation: '',
              shippingstreet: '',
              shippingcity: '',
              shippingstate: '',
              shippingzipcode: '',
              shippingcountry: 0,
              doubleOptinRegister: false,
              sendOptinMail: false,
            }}
            onSubmit={(values) => handlePress(values)}
            validationSchema={yup.object().shape({
              email: yup
                .string()
                .email()
                .required('E-mail is a required filed'),
              password: yup
                .string()
                .required('No password provided.')
                .min(8, 'Password is too short - should be 8 chars minimum.')
                .matches(
                  /[a-zA-Z]/,
                  'Password can only contain Latin letters.',
                ),
              confirmpassword: yup.string().when('password', {
                is: (val) => (val && val.length > 0 ? true : false),
                then: yup
                  .string()
                  .oneOf(
                    [yup.ref('password')],
                    'Both password need to be the same',
                  ),
              }),
              firstname: yup.string().required(),
              lastname: yup.string().required(),
              salutation: yup.string().required(),
              newsletter: yup.bool(),
              billingfirstname: yup.string().required(),
              billinglastname: yup.string().required(),
              billingsalutation: yup.string().required(),
              billingstreet: yup.string().required(),
              billingstate: yup.string().required(),
              billingzipcode: yup.number().required(),
              billingcity: yup.string().required(),
              billingcountry: yup.number().required(),
              isShipping: yup.boolean(),
              shippingfirstname: yup.string().when('isShipping', {
                is: true,
                then: yup.string().required(),
              }),
              shippinglastname: yup.string().when('isShipping', {
                is: true,
                then: yup.string().required(),
              }),
              shippingsalutation: yup.string().when('isShipping', {
                is: true,
                then: yup.string().required(),
              }),
              shippingstreet: yup.string().when('isShipping', {
                is: true,
                then: yup.string().required(),
              }),
              shippingstate: yup.string().when('isShipping', {
                is: true,
                then: yup.string().required(),
              }),
              shippingzipcode: yup.string().when('isShipping', {
                is: true,
                then: yup.string().required(),
              }),
              shippingcity: yup.string().when('isShipping', {
                is: true,
                then: yup.string().required(),
              }),
              shippingcountry: yup.string().when('isShipping', {
                is: true,
                then: yup.string().required(),
              }),
            })}>
            {({
              errors,
              touched,
              isValid,
              handleSubmit,
              setFieldValue,
              values,
            }) => (
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
                    name="confirmpassword"
                    placeholder="Confirm password *"
                  />
                </View>
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
                  <GenderActionSheet
                    onPress={(option) => {
                      setFieldValue('salutation', option);
                    }}
                  />
                </View>
                {touched.salutation && errors.salutation && (
                  <FormErrorLabel errorMessage={errors.salutation} />
                )}
                {/* BILLING ADDRESS */}
                <View marginT-s5>
                  <Headline type="h3">Billing Address</Headline>
                </View>

                <View marginV-s2>
                  <Field
                    component={FormInput}
                    name="billingfirstname"
                    placeholder="Billing Addresse Firstname *"
                  />
                </View>
                <View marginV-s2>
                  <Field
                    component={FormInput}
                    name="billinglastname"
                    placeholder="Billing Addresse Lastname *"
                  />
                </View>
                <View marginV-s2>
                  <GenderActionSheet
                    onPress={(option) => {
                      setFieldValue('billingsalutation', option);
                    }}
                  />
                  {touched.billingsalutation && errors.billingsalutation && (
                    <FormErrorLabel errorMessage={errors.billingsalutation} />
                  )}
                </View>

                <View marginV-s2>
                  <Field
                    component={FormInput}
                    name="billingstreet"
                    placeholder="Street *"
                  />
                </View>
                <View marginV-s2>
                  <Field
                    component={FormInput}
                    name="billingzipcode"
                    placeholder="Zipcode *"
                  />
                </View>
                <View marginV-s2>
                  <Field
                    component={FormInput}
                    name="billingcity"
                    placeholder="City *"
                  />
                </View>
                <View marginV-s2>
                  <Field
                    component={FormInput}
                    name="billingstate"
                    placeholder="State *"
                  />
                </View>
                <View marginV-s2>
                  <CountryDropDown
                    onPress={(countryId) => {
                      setFieldValue('billingcountry', countryId);
                    }}
                  />
                  {touched.billingcountry && errors.billingcountry && (
                    <FormErrorLabel errorMessage={errors.billingcountry} />
                  )}
                </View>
                {/* BILLING ADDRESS */}
                <View marginV-s2>
                  <CheckBox
                    label="The shipping address does not match the billing address"
                    onPress={(isChecked) => {
                      setFieldValue('isShipping', isChecked);
                    }}
                  />
                </View>
                {/* SHIPPING ADDRESS */}
                {values.isShipping && (
                  <>
                    <View marginT-s5>
                      <Headline type="h3">Shipping Address</Headline>
                    </View>
                    <View marginV-s2>
                      <Field
                        component={FormInput}
                        name="shippingfirstname"
                        placeholder="Shipping Address Firstname *"
                      />
                    </View>
                    <View marginV-s2>
                      <Field
                        component={FormInput}
                        name="shippinglastname"
                        placeholder="Shipping Address Lastname *"
                      />
                    </View>
                    <View marginV-s2>
                      <GenderActionSheet
                        onPress={(option) => {
                          setFieldValue('shippingsalutation', option);
                        }}
                      />
                      {touched.shippingsalutation &&
                        errors.shippingsalutation && (
                          <FormErrorLabel
                            errorMessage={errors.shippingsalutation}
                          />
                        )}
                    </View>
                    <View marginV-s2>
                      <Field
                        component={FormInput}
                        name="shippingstreet"
                        placeholder="Shipping Address Street *"
                      />
                    </View>
                    <View marginV-s2>
                      <Field
                        component={FormInput}
                        name="shippingzipcode"
                        placeholder="Shipping Address Zipcode *"
                      />
                    </View>
                    <View marginV-s2>
                      <Field
                        component={FormInput}
                        name="shippingcity"
                        placeholder="Shipping Address City *"
                      />
                    </View>
                    <View marginV-s2>
                      <Field
                        component={FormInput}
                        name="shippingstate"
                        placeholder="Shipping Address State *"
                      />
                    </View>
                    <View marginV-s2>
                      <CountryDropDown
                        onPress={(countryId) => {
                          setFieldValue('shippingcountry', countryId);
                        }}
                      />
                      {touched.shippingcountry && errors.shippingcountry && (
                        <FormErrorLabel errorMessage={errors.shippingcountry} />
                      )}
                    </View>
                  </>
                )}
                {/* SHIPPING ADDRESS */}
                <View marginV-s2>
                  <CheckBox
                    label="Newsletter"
                    // onPress={(isChecked) => {
                    // 	setFieldValue('newsletter', isChecked);
                    // }}
                  />
                </View>

                <View marginV-s2>
                  <Styled.RegisterButton
                    status="primary"
                    size="medium"
                    onPress={handleSubmit}
                    // disabled={!isValid}
                    accessoryRight={ForwardIcon}>
                    Register
                  </Styled.RegisterButton>
                </View>
              </>
            )}
          </Formik>
        </Container>
      </KeyboardAwareScroll>
    </>
  );
}
