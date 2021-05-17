import React, {useContext} from 'react';
import {Div} from 'react-native-magnus';

import {LocalizationContext} from '../../context/Translations';
import {Container, Headline} from '../../themes/components';

import Languages from './Languages';
import Currencies from './Currencies';

const SettingScreen = () => {
  const {translations} = useContext(LocalizationContext);

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
