import React, {useContext} from 'react';
import {Text, Radio, Div} from 'react-native-magnus';

import {languages} from '../../localization/languages';
import AppContext from '../../context/AppContext';
import {LocalizationContext} from '../../context/Translations';

export default function Languages() {
  const {setAppLanguage} = useContext(LocalizationContext);
  const {
    setSelectedLanguageContext,
    setSelectedTranslateContext,
    selectedLanguage,
  } = useContext(AppContext);

  function handleLanguage(lang) {
    setAppLanguage(lang.locale);
    setSelectedLanguageContext(lang.id);
    setSelectedTranslateContext(lang.translateId);
  }

  console.log('selectedLanguage :>> ', selectedLanguage);

  return (
    <>
      <Radio.Group row onChange={(lang) => handleLanguage(lang)}>
        {languages.map((lang) => (
          <Radio value={lang} key={lang.id}>
            {({}) => (
              <Div
                bg={selectedLanguage === lang.id ? 'blue600' : 'blue100'}
                px="xl"
                py="md"
                mr="md"
                rounded="circle">
                <Text
                  color={selectedLanguage === lang.id ? 'white' : 'gray800'}>
                  {lang.name}
                </Text>
              </Div>
            )}
          </Radio>
        ))}
      </Radio.Group>
    </>
  );
}
