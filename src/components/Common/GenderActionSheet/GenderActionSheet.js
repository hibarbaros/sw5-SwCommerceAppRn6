import React, { createRef, useState, useEffect } from 'react';
import { Dropdown } from 'react-native-magnus';

import { FormErrorLabel, Text } from 'themes/components';
import { Button } from 'themes/components';

const genderList = [
  {
    name: 'Mr.',
    value: 'mr'
  },
  {
    name: 'Mrs.',
    value: 'mrs'
  }
];

export default function GenderActionSheet(props) {
  const dropdownRef = createRef();
  const {
    salutationValue,
    field: { name, onBlur, onChange },
    form: { errors, touched, setFieldTouched },
    ...inputProps
  } = props;

  const [initialValue, setinitialValue] = useState(null);
  const hasError = errors[name] && touched[name];

  useEffect(() => {
    const selectedGender = genderList.find((x) => x.value === salutationValue);
    selectedGender ? setinitialValue(selectedGender) : setinitialValue(null);
  }, []);

  return (
    <>
      <Button
        block
        justifyContent="space-between"
        mr="auto"
        my={10}
        text={initialValue ? initialValue.name : inputProps.placeholder}
        onPress={() => dropdownRef.current.open()}
        suffix="arrow-down"
      />
      {hasError && <FormErrorLabel errorMessage={errors[name]} />}
      <Dropdown ref={dropdownRef} mt="md" pb="2xl" showSwipeIndicator={true} roundedTop="xl">
        {genderList.map((gender) => (
          <Dropdown.Option
            key={gender.value}
            py="md"
            px="xl"
            block
            disabled={initialValue?.value === gender.value}
            onPress={() => {
              onChange(name)(gender.value);
              setinitialValue(gender);
            }}
          >
            <Text
              variant="medium"
              onBlur={() => {
                setFieldTouched(name);
                onBlur(name);
              }}
            >
              {gender.name}
            </Text>
          </Dropdown.Option>
        ))}
      </Dropdown>
    </>
  );
}
