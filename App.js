import React, {useRef} from 'react';
import {QueryClient, QueryClientProvider} from 'react-query';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {NavigationContainer} from '@react-navigation/native';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import Toast from 'react-native-toast-message';
// import database from '@react-native-firebase/database';
// import messaging from '@react-native-firebase/messaging';

import Navigation from './src/navigation/Navigation';
import {NavigationTheme} from './src/themes/variables';
import AppProvider from './src/context/AppProvider';
import CheckoutProvider from './src/context/CheckoutProvider';
import FilterProvider from './src/context/FilterProvider';
import {LocalizationProvider} from './src/context/Translations';

import {default as theme} from './src/themes/theme';

const queryClient = new QueryClient();

// async function saveTokenToDatabase(token) {
//   // Assume user is already signed in

//   // Add the token to the users datastore
//   await database().collection('users').update({
//     tokens: token,
//   });
// }

const App = () => {
  const ref = useRef(null);

  // React.useEffect(() => {
  //   // Get the device token
  //   messaging()
  //     .getToken()
  //     .then((token) => {
  //       console.tron.error(token);
  //     });
  // }, []);

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
      </QueryClientProvider>
      <Toast ref={(e) => Toast.setRef(e)} />
    </>
  );
};

export default App;
