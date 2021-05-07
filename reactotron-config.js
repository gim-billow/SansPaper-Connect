import Reactotron, {openInEditor} from 'reactotron-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {reactotronRedux as reduxPlugin} from 'reactotron-redux';
import sagaPlugin from 'reactotron-redux-saga';

console.disableYellowBox = true;

// First, set some configuration settings on how to connect to the app
Reactotron.setAsyncStorageHandler(AsyncStorage);
Reactotron.configure({
  name: 'Sans Paper Connect',
});

// add every built-in react native feature.  you also have the ability to pass
// an object as a parameter to configure each individual react-native plugin
// if you'd like.
Reactotron.useReactNative({
  asyncStorage: {
    ignore: ['secret'],
  },
});

Reactotron.use(openInEditor());
Reactotron.use(reduxPlugin());
Reactotron.use(sagaPlugin());

// if we're running in DEV mode, then let's connect!
if (__DEV__) {
  Reactotron.connect();
  Reactotron.clear();
}

console.tron = Reactotron;
