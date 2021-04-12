import React, {useState, useContext} from 'react';
import {Menu, MenuGroup, MenuItem, Text} from '@ui-kitten/components';

import {LocalizationContext} from '../../context/Translations';
import {Container} from '../../themes/components';
import AppContext from '../../context/AppContext';
import {languages} from '../../localization/languages';
import {useShopByShopId} from '../../utils/hooks/useApp';

const SettingScreen = () => {
  const {translations, appLanguage} = useContext(LocalizationContext);
  const {
    currency,
    setCurrency,
    setSelectedLanguageContext,
    selectedLanguage,
  } = useContext(AppContext);

  const {isLoading, data} = useShopByShopId();

  const [selectedIndex, setSelectedIndex] = useState(appLanguage);
  const [selectedCurrencyIndex, setSelectedCurrencyIndex] = useState(
    currency.id,
  );

  function handleLanguage(lang) {
    setSelectedLanguageContext(lang.id);
  }

  function handleCurrency(cur) {
    setCurrency(cur);
    setSelectedCurrencyIndex(cur.id);
  }

  return (
    <Container>
      <Menu
        selectedIndex={selectedIndex}
        onSelect={(index) => setSelectedIndex(index)}>
        <MenuGroup title={translations.appLanguages}>
          {languages.map((lang) => (
            <MenuItem
              key={lang.name}
              selected={selectedLanguage === lang.id}
              title={lang.name}
              locale={lang.locale}
              onPress={() => handleLanguage(lang)}
            />
          ))}
        </MenuGroup>
      </Menu>
      {isLoading ? (
        <Text>Loading</Text>
      ) : (
        <Menu>
          <MenuGroup title={translations.appCurrencies}>
            {data.currencies.map((currencyItem, index) => (
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
