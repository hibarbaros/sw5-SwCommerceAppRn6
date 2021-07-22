import React, { useRef } from 'react';
import { QueryClient, QueryClientProvider, setLogger } from 'react-query';
import { NavigationContainer } from '@react-navigation/native';
import * as eva from '@eva-design/eva';
import { ThemeProvider } from 'react-native-magnus';
import Toast from 'react-native-toast-message';

import MainNavigation from './src/navigation/MainNavigation';
import { NavigationTheme } from 'themes/variables';
import { AppProvider } from './src/context/AppContext';
import { CheckoutProvider } from './src/context/CheckoutContext';
import { CartProvider } from './src/context/CartContext';
import FilterProvider from './src/context/FilterProvider';
import { LocalizationProvider } from './src/context/Translations';

import linking from './src/config/linking';

import { theme } from './src/themes/theme';

const queryClient = new QueryClient();

const App = () => {
  const ref = useRef(null);

  setLogger({
    log: console.log,
    warn: console.log,
    error: console.log
  });

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <LocalizationProvider>
            <AppProvider>
              <CartProvider>
                <CheckoutProvider>
                  <FilterProvider>
                    <NavigationContainer theme={NavigationTheme} ref={ref} linking={linking}>
                      <MainNavigation />
                    </NavigationContainer>
                  </FilterProvider>
                </CheckoutProvider>
              </CartProvider>
            </AppProvider>
          </LocalizationProvider>
        </ThemeProvider>
      </QueryClientProvider>
      <Toast ref={(e) => Toast.setRef(e)} />
    </>
  );
};

export default App;
