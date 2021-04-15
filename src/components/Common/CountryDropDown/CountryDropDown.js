import React, {createRef, useState} from 'react';
import {Dropdown, Text} from 'react-native-magnus';

import {FormErrorLabel} from '../../../themes/components';
import {Button} from '../../../themes/components';
import {useCountries} from '../../../utils/hooks/useApp';

export default function CountryDropDown(props) {
  const {
    field: {name, onBlur, onChange},
    form: {errors, touched, setFieldTouched, setFieldValue},
    ...inputProps
  } = props;

  const [initialValue, setinitialValue] = useState(inputProps.placeholder);

  const hasError = errors[name] && touched[name];
  const dropdownRef = createRef();

  const {isLoading, data} = useCountries();

  if (isLoading) {
    return <Text>'Loading...'</Text>;
  }

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
        {data.map((country) => (
          <Dropdown.Option
            key={country.id}
            onPress={() => {
              onChange(name)(country.name);
              setinitialValue(country.name);
              setFieldValue(name, country.id);
            }}
            py="md"
            px="xl"
            block>
            <Text
              onBlur={() => {
                setFieldTouched(name);
                onBlur(name);
              }}>
              {country.name}
            </Text>
          </Dropdown.Option>
        ))}
      </Dropdown>
    </>
  );
}
