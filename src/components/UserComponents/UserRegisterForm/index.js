import React from 'react';
import {StackActions, useNavigation} from '@react-navigation/native';
import {View} from 'react-native-ui-lib';
import {Formik, Field} from 'formik';
import * as yup from 'yup';
//*components
import {
  KeyboardAwareScroll,
  Container,
  FormInput,
  Headline,
  CheckBox,
  Button,
} from '../../../themes/components';
import GenderActionSheet from '../../Common/GenderActionSheet/GenderActionSheet';
import CountryDropDown from '../../Common/CountryDropDown/CountryDropDown';
import LoadSpinner from '../../Common/LoadSpinner';
//*utils
import AppRoutes from '../../../utils/approutes';
import {useRegisterCustomer} from '../../../utils/hooks/useCustomer';
import {validationSchema} from '../../../utils/validationSchema';
//*self
import {initialValues} from './initialValues';

export default function UserRegisterForm({modalVisible = false}) {
  const navigation = useNavigation();

  const {mutateAsync, isLoading} = useRegisterCustomer();

  async function handlePress(value) {
    const mutate = await mutateAsync(value);
    if (mutate) {
      modalVisible
        ? modalVisible()
        : navigation.dispatch(StackActions.replace(AppRoutes.PROFILE));
    }
  }

  return (
    <>
      <LoadSpinner isVisible={isLoading} />
      <KeyboardAwareScroll>
        <Container>
          <Formik
            initialValues={initialValues}
            onSubmit={(values) => handlePress(values)}
            validationSchema={yup.object().shape({
              email: validationSchema.emailValidation(
                'E-mail is a required filed',
              ),
              password: validationSchema.passwordValidation(
                'No password provided.',
                'Password is too short - should be 8 chars minimum.',
                'Password can only contain Latin letters.',
              ),
              confirmpassword: validationSchema.confirmpasswordValidation(
                'Both password need to be the same',
              ),
              firstname: validationSchema.textValidation(
                'Firstname is a required filed',
              ),
              lastname: validationSchema.textValidation(
                'Lastname is a required filed',
              ),
              salutation: validationSchema.textValidation(
                'Salutation is a required filed',
              ),
              newsletter: validationSchema.newsletterValidation,
              billingfirstname: validationSchema.textValidation(
                'Billing Firstname is a required filed',
              ),
              billinglastname: validationSchema.textValidation(
                'Billing Lastname is a required filed',
              ),
              billingsalutation: validationSchema.textValidation(
                'Billing Salutation is a required filed',
              ),
              billingstreet: validationSchema.textValidation(
                'Billing Street is a required filed',
              ),
              billingstate: validationSchema.textValidation(
                'Billing State is a required filed',
              ),
              billingzipcode: validationSchema.textValidation(
                'Billing Zip Code is a required filed',
              ),
              billingcity: validationSchema.textValidation(
                'Billing City is a required filed',
              ),
              billingcountry: validationSchema.textValidation(
                'Billing Country is a required filed',
              ),
              isShipping: validationSchema.isShippingValidation,
              shippingfirstname: validationSchema.isShippingTrue(
                'Shipping Firstname is a required filed',
              ),
              shippinglastname: validationSchema.isShippingTrue(
                'Shipping Lastname is a required filed',
              ),
              shippingsalutation: validationSchema.isShippingTrue(
                'Shipping Salutation is a required filed',
              ),
              shippingstreet: validationSchema.isShippingTrue(
                'Shipping Street is a required filed',
              ),
              shippingstate: validationSchema.isShippingTrue(
                'Shipping State is a required filed',
              ),
              shippingzipcode: validationSchema.isShippingTrue(
                'Shipping Zip Code is a required filed',
              ),
              shippingcity: validationSchema.isShippingTrue(
                'Shipping City is a required filed',
              ),
              shippingcountry: validationSchema.isShippingTrue(
                'Shipping Country is a required filed',
              ),
            })}>
            {({handleSubmit, setFieldValue, values}) => (
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
                  <Field
                    component={GenderActionSheet}
                    name="salutation"
                    placeholder="Gender Select"
                  />
                </View>
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
                  <Field
                    component={GenderActionSheet}
                    name="billingsalutation"
                    placeholder="Gender Select"
                  />
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
                  <Field
                    component={CountryDropDown}
                    name="billingcountry"
                    placeholder="Country Select"
                  />
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
                      <Field
                        component={GenderActionSheet}
                        name="shippingsalutation"
                        placeholder="Gender Select"
                      />
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
                      <Field
                        component={CountryDropDown}
                        name="shippingcountry"
                        placeholder="Country Select"
                      />
                    </View>
                  </>
                )}
                {/* SHIPPING ADDRESS */}
                <View marginV-s2>
                  <CheckBox
                    label="Newsletter"
                    onPress={(isChecked) =>
                      setFieldValue('newsletter', isChecked)
                    }
                  />
                </View>

                <View marginV-s2>
                  <Button
                    block
                    text="Register"
                    onPress={handleSubmit}
                    suffix="save"
                    mr={20}
                    disabled={isLoading}
                  />
                </View>
              </>
            )}
          </Formik>
        </Container>
      </KeyboardAwareScroll>
    </>
  );
}
