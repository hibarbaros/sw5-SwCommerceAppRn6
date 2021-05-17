import React, {createRef, useState} from 'react';
import {Dropdown, Text} from 'react-native-magnus';

import {FormErrorLabel} from '../../../themes/components';
import {Button} from '../../../themes/components';

const genderList = [
  {
    name: 'Mr.',
    value: 'mr',
  },
  {
    name: 'Mrs.',
    value: 'mrs',
  },
];

export default function GenderActionSheet(props) {
  const dropdownRef = createRef();
  const {
    salutationValue,
    field: {name, onBlur, onChange},
    form: {errors, touched, setFieldTouched},
    ...inputProps
  } = props;

  const [initialValue, setinitialValue] = useState(inputProps.placeholder);

  const hasError = errors[name] && touched[name];

  return (
    <>
      <Button
        block
        mr="auto"
        my={10}
        text={
          salutationValue
            ? genderList.find((x) => x.value === salutationValue).name
            : initialValue
        }
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
        {genderList.map((item) => (
          <Dropdown.Option
            key={item.value}
            onPress={() => {
              onChange(name)(item.value);
              setinitialValue(item.name);
            }}
            py="md"
            px="xl"
            block>
            <Text
              onBlur={() => {
                setFieldTouched(name);
                onBlur(name);
              }}>
              {item.name}
            </Text>
          </Dropdown.Option>
        ))}
      </Dropdown>
    </>
  );
}
