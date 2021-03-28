/**
 * @format
 */

import {Navigation} from 'react-native-navigation';
import React from 'react';
// import {SafeAreaProvider} from 'react-native-safe-area-context';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import {createStore, applyMiddleware, compose} from 'redux';
import createSagaMiddleware from 'redux-saga';

import {Provider} from 'react-redux';
import {Provider as PaperProvider} from 'react-native-paper';

// redux
import {rootSaga, rootReducer} from './src/store';
import {appScreens, startApp} from './src/screen';

// react native paper theme
import {theme} from 'styles/papertheme';

let middlewaresToApply = [];

// Flipper debugger
if (__DEV__) {
  const createDebugger = require('redux-flipper').default;
  middlewaresToApply.push(createDebugger({resolveCyclic: true}));
}

const sagaMiddleware = createSagaMiddleware();

let middleware = [applyMiddleware(sagaMiddleware, ...middlewaresToApply)];

if (global.__REDUX_DEVTOOLS_EXTENSION__) {
  middleware = [...middleware, global.__REDUX_DEVTOOLS_EXTENSION__()];
}

console.disableYellowBox = true;
const store = createStore(rootReducer, compose(...middleware));

sagaMiddleware.run(rootSaga);

// Register screens
appScreens.forEach((ScreenComponent, key) => {
  Navigation.registerComponent(
    key,
    () => (props) => (
      <Provider store={store}>
        <PaperProvider
          theme={theme}
          settings={{
            icon: (props) => <MaterialIcon {...props} />,
          }}>
          <ScreenComponent {...props} style={{backgroundColor: 'white'}} />
        </PaperProvider>
      </Provider>
    ),
    () => ScreenComponent,
  );
});

Navigation.events().registerAppLaunchedListener(() => {
  startApp();
});

console.disableYellowBox = true;
