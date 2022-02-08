import React from 'react';
import { StackActions, useNavigation } from '@react-navigation/native';
import { Div } from 'react-native-magnus';
import { Formik, Field } from 'formik';
import * as yup from 'yup';
//*components
import {
  KeyboardAwareScroll,
  Container,
  FormInput,
  Headline,
  CheckBox,
  Button
} from 'themes/components';
import GenderActionSheet from 'components/Common/GenderActionSheet/GenderActionSheet';
import CountryDropDown from 'components/Common/CountryDropDown/CountryDropDown';
import LoadSpinner from 'components/Common/LoadSpinner';
//*utils
import AppRoutes from 'utils/approutes';
import { useRegisterCustomer } from 'utils/hooks/useCustomer';
//*self
import { initialValues } from './initialValues';
import { schema } from './validationSchema';

export default function UserRegisterForm({ navigationDisabled = false }) {
  const navigation = useNavigation();

  const { mutateAsync, isLoading } = useRegisterCustomer();

  async function handlePress(value) {
    const mutate = await mutateAsync(value);
    if (mutate && !navigationDisabled) {
      navigation.dispatch(StackActions.replace(AppRoutes.PROFILE));
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
            validationSchema={yup.object().shape(schema)}
          >
            {({ handleSubmit, setFieldValue, values }) => (
              <>
                <Div>
                  <Field component={FormInput} name="email" placeholder="E-Mail *" />
                </Div>
                <Div>
                  <Field
                    secureTextEntry={true}
                    component={FormInput}
                    name="password"
                    placeholder="Password *"
                  />
                </Div>
                <Div>
                  <Field
                    secureTextEntry={true}
                    component={FormInput}
                    name="confirmpassword"
                    placeholder="Confirm password *"
                  />
                </Div>
                <Div>
                  <Field component={FormInput} name="firstname" placeholder="Firstname *" />
                </Div>
                <Div>
                  <Field component={FormInput} name="lastname" placeholder="Lastname *" />
                </Div>
                <Div>
                  <Field
                    component={GenderActionSheet}
                    name="salutation"
                    placeholder="Gender Select"
                  />
                </Div>
                {/* ANCHOR BILLING ADDRESS */}
                <Div marginT-s5>
                  <Headline type="h3">Billing Address</Headline>
                </Div>

                <Div>
                  <Field
                    component={FormInput}
                    name="billingfirstname"
                    placeholder="Billing Addresse Firstname *"
                  />
                </Div>
                <Div>
                  <Field
                    component={FormInput}
                    name="billinglastname"
                    placeholder="Billing Addresse Lastname *"
                  />
                </Div>
                <Div>
                  <Field
                    component={GenderActionSheet}
                    name="billingsalutation"
                    placeholder="Gender Select"
                  />
                </Div>
                <Div>
                  <Field component={FormInput} name="billingstreet" placeholder="Street *" />
                </Div>
                <Div>
                  <Field component={FormInput} name="billingzipcode" placeholder="Zipcode *" />
                </Div>
                <Div>
                  <Field component={FormInput} name="billingcity" placeholder="City *" />
                </Div>
                <Div>
                  <Field component={FormInput} name="billingstate" placeholder="State *" />
                </Div>
                <Div>
                  <Field
                    component={CountryDropDown}
                    name="billingcountry"
                    placeholder="Country Select"
                  />
                </Div>
                {/* ANCHOR BILLING ADDRESS */}
                <Div>
                  <CheckBox
                    label="The shipping address does not match the billing address"
                    onPress={(isChecked) => {
                      setFieldValue('isShipping', isChecked);
                    }}
                  />
                </Div>
                {/* ANCHOR SHIPPING ADDRESS */}
                {values.isShipping && (
                  <>
                    <Div marginT-s5>
                      <Headline type="h3">Shipping Address</Headline>
                    </Div>
                    <Div>
                      <Field
                        component={FormInput}
                        name="shippingfirstname"
                        placeholder="Shipping Address Firstname *"
                      />
                    </Div>
                    <Div>
                      <Field
                        component={FormInput}
                        name="shippinglastname"
                        placeholder="Shipping Address Lastname *"
                      />
                    </Div>
                    <Div>
                      <Field
                        component={GenderActionSheet}
                        name="shippingsalutation"
                        placeholder="Gender Select"
                      />
                    </Div>
                    <Div>
                      <Field
                        component={FormInput}
                        name="shippingstreet"
                        placeholder="Shipping Address Street *"
                      />
                    </Div>
                    <Div>
                      <Field
                        component={FormInput}
                        name="shippingzipcode"
                        placeholder="Shipping Address Zipcode *"
                      />
                    </Div>
                    <Div>
                      <Field
                        component={FormInput}
                        name="shippingcity"
                        placeholder="Shipping Address City *"
                      />
                    </Div>
                    <Div>
                      <Field
                        component={FormInput}
                        name="shippingstate"
                        placeholder="Shipping Address State *"
                      />
                    </Div>
                    <Div>
                      <Field
                        component={CountryDropDown}
                        name="shippingcountry"
                        placeholder="Country Select"
                      />
                    </Div>
                  </>
                )}
                {/* ANCHOR SHIPPING ADDRESS */}
                <Div my={10}>
                  <CheckBox
                    label="Newsletter"
                    onPress={(isChecked) => setFieldValue('newsletter', isChecked)}
                  />
                </Div>

                <Div my={10}>
                  <Button
                    block
                    text="Register"
                    onPress={handleSubmit}
                    mr={20}
                    disabled={isLoading}
                  />
                </Div>
              </>
            )}
          </Formik>
        </Container>
      </KeyboardAwareScroll>
    </>
  );
}
