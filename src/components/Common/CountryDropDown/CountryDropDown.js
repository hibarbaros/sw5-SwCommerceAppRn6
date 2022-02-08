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
  const { isLoading, data } = useCountries();

  const hasError = errors[name] && touched[name];
  const dropdownRef = createRef();

  useEffect(() => {
    if (data) {
      const selectedCountry = data.find((x) => x.id === parseInt(countryId, 10));
      selectedCountry ? setinitialValue(selectedCountry) : setinitialValue(null);
    }
  }, [data]);

  return (
    !isLoading && (
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
    )
  );
}
