import React from 'react';

import {FormErrorLabel} from '../';
import {Styled} from './styles';

export default function FormInput(props) {
  const {
    field: {name, onBlur, onChange, value},
    form: {errors, touched, setFieldTouched},
    ...inputProps
  } = props;

  const hasError = errors[name] && touched[name];

  return (
    <Styled.StyledTextInput
      value={value}
      size="large"
      onChangeText={(text) => onChange(name)(text)}
      caption={hasError && <FormErrorLabel errorMessage={errors[name]} />}
      onBlur={() => {
        setFieldTouched(name);
        onBlur(name);
      }}
      {...inputProps}
    />
  );
}
