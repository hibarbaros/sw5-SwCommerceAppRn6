import React from 'react';
import { Input, Icon } from 'react-native-magnus';

import { FormErrorLabel } from 'themes/components';

export default function FormInput(props) {
  const {
    field: { name, onBlur, onChange, value },
    form: { errors, touched, setFieldTouched },
    suffix,
    prefix,
    ...inputProps
  } = props;

  const hasError = errors[name] && touched[name];

  return (
    <>
      <Input
        {...inputProps}
        value={value}
        label="test"
        onChangeText={(text) => onChange(name)(text)}
        p={10}
        my={10}
        fontSize={18}
        focusBorderColor="blue700"
        onBlur={() => {
          setFieldTouched(name);
          onBlur(name);
        }}
        prefix={<Icon name={prefix} color="gray900" fontFamily="FontAwesome" />}
        suffix={<Icon name={suffix} color="gray900" fontFamily="FontAwesome" />}
      />
      {hasError && <FormErrorLabel errorMessage={errors[name]} />}
    </>
  );
}
