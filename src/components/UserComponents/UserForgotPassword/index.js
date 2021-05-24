import React from 'react';
import {Div} from 'react-native-magnus';
import * as yup from 'yup';
import {Formik, Field} from 'formik';
//*components
import {FormInput, Button, Container} from '../../../themes/components';
import LoadSpinner from '../../Common/LoadSpinner';
//*utils
import {useForgotPassword} from '../../../utils/hooks/useEmailjs';
import {validationSchema} from '../../../utils/validationSchema';

import {initialValues} from './initialValues';

export default function UserForgotPassword() {
  const {mutateAsync, isLoading} = useForgotPassword();

  async function handleLogin(values) {
    await mutateAsync(values);
  }

  return (
    <>
      <LoadSpinner isVisible={isLoading} />
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => handleLogin(values)}
        validationSchema={yup.object().shape({
          email: validationSchema.emailValidation('E-mail is a required filed'),
        })}>
        {({handleSubmit}) => (
          <Container>
            <Div>
              <Field
                component={FormInput}
                name="email"
                placeholder="E-Mail *"
                suffix="envelope"
              />
            </Div>
            <Div mT={10}>
              <Button block text="Send" onPress={handleSubmit} />
            </Div>
          </Container>
        )}
      </Formik>
    </>
  );
}
