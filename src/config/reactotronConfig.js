import Reactotron, {asyncStorage, openInEditor} from 'reactotron-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

console.tron = Reactotron;

Reactotron.setAsyncStorageHandler(AsyncStorage)
  .configure({
    name: 'SwCommerce Demo',
  })
  .useReactNative({
    asyncStorage: true, // there are more options to the async storage.
    networking: {
      // optionally, you can turn it off with false.
      ignoreUrls: /symbolicate/,
    },
    editor: false, // there are more options to editor
    errors: {veto: (stackFrame) => false}, // or turn it off with false
    overlay: false, // just turning off overlay
  })
  .use(openInEditor())
  .use(asyncStorage())
  .connect();
