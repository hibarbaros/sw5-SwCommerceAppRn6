import React, {createRef, useState} from 'react';
import {useQuery} from 'react-query';
import ActionSheet from 'react-native-actions-sheet';
import {ListItem, Text} from '@ui-kitten/components';
import * as Icon from 'react-native-feather';

import {colors} from '../../../themes/variables';
import {countriesData} from '../../../utils/actions/appactions';

import {Styled} from './styles';

const ArrowIcon = (props) => (
  <Icon.ArrowDown stroke={colors.white} {...props} />
);

export default function CountryDropDown({onPress, userAddress = null}) {
  const actionSheetRef = createRef();

  const [buttonValue, setButtonValue] = useState('Country Select');

  const {isLoading, data} = useQuery('countries', () => countriesData(), {
    onSuccess: (res) => {
      if (userAddress) {
        const finded = res.find(
          (x) => x.id === parseInt(userAddress.country_id),
        );
        setButtonValue(finded.name);
        onPress(userAddress.country_id);
      }
    },
  });

  if (isLoading) {
    return <Text>'Loading...'</Text>;
  }

  function handleItem(countryId, countryName) {
    onPress(countryId);
    setButtonValue(countryName);
    actionSheetRef.current.setModalVisible(false);
  }

  return (
    <>
      <Styled.ButtonContainer>
        <Styled.StyledButton
          buttonType="dropDownButton"
          size="medium"
          accessoryRight={ArrowIcon}
          onPress={() => {
            actionSheetRef.current.setModalVisible();
          }}>
          {buttonValue}
        </Styled.StyledButton>
      </Styled.ButtonContainer>

      <ActionSheet ref={actionSheetRef}>
        <Styled.ActionSheetContainer>
          {data.map((country) => (
            <ListItem
              key={country.id}
              onPress={() => handleItem(country.id, country.name)}
              title={country.name}
            />
          ))}
        </Styled.ActionSheetContainer>
      </ActionSheet>
    </>
  );
}
