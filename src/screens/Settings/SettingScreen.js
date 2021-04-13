import React, {useState, useContext} from 'react';
import {Menu, MenuGroup, MenuItem} from '@ui-kitten/components';

import {LocalizationContext} from '../../context/Translations';
import {Container} from '../../themes/components';
import AppContext from '../../context/AppContext';
import {languages} from '../../localization/languages';

const SettingScreen = () => {
  const {translations, appLanguage, setAppLanguage} = useContext(
    LocalizationContext,
  );
  const {
    currency,
    setCurrency,
    setSelectedLanguageContext,
    selectedLanguage,
    allCurrencies,
  } = useContext(AppContext);

  const [selectedIndex, setSelectedIndex] = useState(appLanguage);

  function handleLanguage(lang) {
    setAppLanguage(lang.locale);
    setSelectedLanguageContext(lang.id);
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
      <Menu>
        <MenuGroup title={translations.appCurrencies}>
          {allCurrencies.map((currencyItem, index) => (
            <MenuItem
              key={currencyItem.id}
              selected={currencyItem.id === currency.id}
              title={currencyItem.name}
              onPress={() => setCurrency(currencyItem)}
            />
          ))}
        </MenuGroup>
      </Menu>
    </Container>
  );
};

export default SettingScreen;
