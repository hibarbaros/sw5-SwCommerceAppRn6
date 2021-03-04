import React, {useRef} from 'react';
import {QueryClient, QueryClientProvider} from 'react-query';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {NavigationContainer} from '@react-navigation/native';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import Toast from 'react-native-toast-message';
// import {ReactQueryDevtools} from 'react-query-devtools';

import Navigation from './src/navigation/Navigation';
import {NavigationTheme} from './src/themes/variables';
import AppProvider from './src/context/AppProvider';
import CheckoutProvider from './src/context/CheckoutProvider';
import FilterProvider from './src/context/FilterProvider';
import {LocalizationProvider} from './src/context/Translations';

import {default as theme} from './src/themes/theme';

const queryClient = new QueryClient();

const App = () => {
  const ref = useRef(null);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider {...eva} theme={{...eva.light, ...theme}}>
          <LocalizationProvider>
            <AppProvider>
              <CheckoutProvider>
                <FilterProvider>
                  <NavigationContainer theme={NavigationTheme} ref={ref}>
                    <Navigation />
                  </NavigationContainer>
                </FilterProvider>
              </CheckoutProvider>
            </AppProvider>
          </LocalizationProvider>
        </ApplicationProvider>
        {/* <ReactQueryDevtools initialIsOpen /> */}
      </QueryClientProvider>
      <Toast ref={(e) => Toast.setRef(e)} />
    </>
  );
};

export default App;
