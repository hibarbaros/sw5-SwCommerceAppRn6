import React, {useState, useContext} from 'react';
import {Menu, MenuGroup, MenuItem, Text} from '@ui-kitten/components';
import {useQuery} from 'react-query';

import {LocalizationContext} from '../../context/Translations';
import {Container} from '../../themes/components';
import AppContext from '../../context/AppContext';
import languages from '../../localization/languages.json';
import {shopData} from '../../utils/actions/appactions';

const SettingScreen = () => {
  const {translations, setAppLanguage, appLanguage} = useContext(
    LocalizationContext,
  );
  const {currency, setCurrency} = useContext(AppContext);

  const [selectedIndex, setSelectedIndex] = useState(appLanguage);
  const [selectedCurrencyIndex, setSelectedCurrencyIndex] = useState(
    currency.id,
  );

  function handleLanguage(locale) {
    setAppLanguage(locale);
  }

  function handleCurrency(currency) {
    setCurrency(currency);
    setSelectedCurrencyIndex(currency.id);
  }

  const {isLoading, error, data: initialShopData} = useQuery('shopData', () =>
    shopData(),
  );

  if (error) return <Text>{error.message}</Text>;

  return (
    <Container>
      <Menu
        selectedIndex={selectedIndex}
        onSelect={(index) => setSelectedIndex(index)}>
        <MenuGroup title={translations.appLanguages}>
          {languages.languages.map((lang) => (
            <MenuItem
              key={lang.name}
              selected={appLanguage === lang.locale}
              title={lang.name}
              locale={lang.locale}
              onPress={() => handleLanguage(lang.locale)}
            />
          ))}
        </MenuGroup>
      </Menu>
      {isLoading ? (
        <Text>Loading</Text>
      ) : (
        <Menu>
          <MenuGroup title={translations.appCurrencies}>
            {initialShopData.currencies.map((currencyItem, index) => (
              <MenuItem
                key={currencyItem.id}
                selected={currencyItem.id === selectedCurrencyIndex}
                title={currencyItem.name}
                onPress={() => handleCurrency(currencyItem)}
              />
            ))}
          </MenuGroup>
        </Menu>
      )}
    </Container>
  );
};

export default SettingScreen;
