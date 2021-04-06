import React, {useRef} from 'react';
import {QueryClient, QueryClientProvider, setLogger} from 'react-query';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {NavigationContainer} from '@react-navigation/native';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import Toast from 'react-native-toast-message';

import Navigation from './src/navigation/Navigation';
import {NavigationTheme} from './src/themes/variables';
import {AppProvider} from './src/context/AppContext';
import {CheckoutProvider} from './src/context/CheckoutContext';
import {CartProvider} from './src/context/CartContext';
import FilterProvider from './src/context/FilterProvider';
import {LocalizationProvider} from './src/context/Translations';

const queryClient = new QueryClient();

const App = () => {
  const ref = useRef(null);

  if (__DEV__) {
    import('react-query-native-devtools').then(({addPlugin}) => {
      addPlugin({queryClient});
    });
  }

  setLogger({
    log: console.log,
    warn: console.log,
    error: console.log,
  });

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider {...eva} theme={{...eva.light}}>
          <LocalizationProvider>
            <AppProvider>
              <CartProvider>
                <CheckoutProvider>
                  <FilterProvider>
                    <NavigationContainer theme={NavigationTheme} ref={ref}>
                      <Navigation />
                    </NavigationContainer>
                  </FilterProvider>
                </CheckoutProvider>
              </CartProvider>
            </AppProvider>
          </LocalizationProvider>
        </ApplicationProvider>
      </QueryClientProvider>
      <Toast ref={(e) => Toast.setRef(e)} />
    </>
  );
};

export default App;
