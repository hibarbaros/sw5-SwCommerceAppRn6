import React, { createRef, useState, useEffect } from 'react';
import { Dropdown } from 'react-native-magnus';

import { Button, FormErrorLabel, Text } from 'themes/components';
import { useCountries } from 'utils/hooks/useApp';

export default function CountryDropDown(props) {
  const {
    countryId,
    field: { name, onBlur, onChange },
    form: { errors, touched, setFieldTouched, setFieldValue },
    ...inputProps
  } = props;

  const [initialValue, setinitialValue] = useState(null);

  const hasError = errors[name] && touched[name];
  const dropdownRef = createRef();

  const { isLoading, data } = useCountries();

  if (isLoading) {
    return <Text>'Loading...'</Text>;
  }

  useEffect(() => {
    const selectedCountry = data.find((x) => x.id === parseInt(countryId, 10));
    selectedCountry ? setinitialValue(selectedCountry) : setinitialValue(null);
  }, []);

  return (
    <>
      <Button
        block
        justifyContent="space-between"
        my={10}
        text={initialValue ? initialValue.name : inputProps.placeholder}
        onPress={() => dropdownRef.current.open()}
        suffix="arrow-down"
      />
      {hasError && (
        <Text color="red" mt={5}>
          {errors[name]}
        </Text>
      )}
      {hasError && <FormErrorLabel errorMessage={errors[name]} />}
      <Dropdown ref={dropdownRef} mt="md" pb="2xl" showSwipeIndicator={true} roundedTop="xl">
        {data.map((country) => (
          <Dropdown.Option
            key={country.id}
            block
            disabled={initialValue?.id === country.id}
            onPress={() => {
              onChange(name)(country.name);
              setinitialValue(country);
              setFieldValue(name, country.id);
            }}
            py="md"
            px="xl"
          >
            <Text
              variant="medium"
              onBlur={() => {
                setFieldTouched(country.name);
                onBlur(country.name);
              }}
            >
              {country.name}
            </Text>
          </Dropdown.Option>
        ))}
      </Dropdown>
    </>
  );
}
