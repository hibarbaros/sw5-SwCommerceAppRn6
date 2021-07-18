import React from 'react';
import {Div} from 'react-native-magnus';

import {useLocalizationContext} from '../../context/Translations';
import {Container, Headline} from '../../themes/components';

import Languages from './Languages';
import Currencies from './Currencies';

const SettingScreen = () => {
  const {translations} = useLocalizationContext();

  return (
    <Container>
      <Headline variant="h5">{translations.appLanguages}</Headline>
      <Div my={10}>
        <Languages />
      </Div>
      <Headline variant="h5" mt={30}>
        {translations.appCurrencies}
      </Headline>
      <Div my={10}>
        <Currencies />
      </Div>
    </Container>
  );
};

export default SettingScreen;
