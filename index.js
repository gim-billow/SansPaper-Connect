/**
 * @format
 */

import {Navigation} from 'react-native-navigation';
import React from 'react';
// import {SafeAreaProvider} from 'react-native-safe-area-context';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {ActionSheetProvider} from '@expo/react-native-action-sheet';

import {createStore, applyMiddleware, compose} from 'redux';
import createSagaMiddleware from 'redux-saga';

// reactotron
import Reactotron from 'reactotron-react-native';

import {Provider} from 'react-redux';
import {Provider as PaperProvider} from 'react-native-paper';

// redux
import {rootSaga, rootReducer} from './src/store';
import {appScreens, startApp} from './src/screen';

// react native paper theme
import {theme} from 'styles/papertheme';

// import push notification & fcm
import messaging from '@react-native-firebase/messaging';
import './notificationService';

const sagaMiddleware = createSagaMiddleware({
  sagaMonitor: Reactotron.createSagaMonitor(),
});

let middleware = [applyMiddleware(sagaMiddleware)];

if (global.__REDUX_DEVTOOLS_EXTENSION__) {
  middleware = [...middleware, global.__REDUX_DEVTOOLS_EXTENSION__()];
}

console.disableYellowBox = true;
const store = createStore(
  rootReducer,
  compose(...middleware, Reactotron.createEnhancer()),
);

sagaMiddleware.run(rootSaga);

// Register screens
appScreens.forEach((ScreenComponent, key) => {
  Navigation.registerComponent(
    key,
    () => (props) => (
      <Provider store={store}>
        <ActionSheetProvider>
          <PaperProvider
            theme={theme}
            settings={{
              icon: (props) => <MaterialIcon {...props} />,
            }}>
            <ScreenComponent {...props} style={{backgroundColor: 'white'}} />
          </PaperProvider>
        </ActionSheetProvider>
      </Provider>
    ),
    () => ScreenComponent,
  );
});

Navigation.events().registerAppLaunchedListener(() => {
  messaging().setBackgroundMessageHandler(async (remoteMsg) => {
    console.log('Message is handled in background', remoteMsg);
  });

  startApp();
});
