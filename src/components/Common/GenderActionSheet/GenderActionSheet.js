import React, {createRef, useState} from 'react';
import {Dropdown, Text} from 'react-native-magnus';

import {FormErrorLabel} from '../../../themes/components';
import {Button} from '../../../themes/components';

export default function GenderActionSheet(props) {
  const {
    field: {name, onBlur, onChange},
    form: {errors, touched, setFieldTouched},
    ...inputProps
  } = props;

  const [initialValue, setinitialValue] = useState(inputProps.placeholder);

  const hasError = errors[name] && touched[name];
  const dropdownRef = createRef();

  return (
    <>
      <Button
        block
        justifyContent="space-around"
        textAlign="left"
        text={initialValue}
        onPress={() => dropdownRef.current.open()}
        suffix="arrow-down"
      />
      {hasError && <FormErrorLabel errorMessage={errors[name]} />}
      <Dropdown
        ref={dropdownRef}
        mt="md"
        pb="2xl"
        showSwipeIndicator={true}
        roundedTop="xl">
        <Dropdown.Option
          onPress={() => {
            onChange(name)('mr');
            setinitialValue('Mr.');
          }}
          py="md"
          px="xl"
          block>
          <Text
            onBlur={() => {
              setFieldTouched(name);
              onBlur(name);
            }}>
            Mr.
          </Text>
        </Dropdown.Option>
        <Dropdown.Option
          onPress={() => {
            onChange(name)('mrs');
            setinitialValue('Mrs.');
          }}
          py="md"
          px="xl"
          block>
          <Text
            onBlur={() => {
              setFieldTouched(name);
              onBlur(name);
            }}>
            Mrs.
          </Text>
        </Dropdown.Option>
      </Dropdown>
    </>
  );
}
