import {all, takeLatest} from 'redux-saga/effects';

import {NAVIGATE_ACTIONS} from './actions';
import {showLoginScreen, showMainScreen} from '@navigation';

function* goToLogin() {
  try {
    showLoginScreen();
  } catch (error) {
    console.error('register error', error);
  }
}

function goToMainScreen() {
  try {
    showMainScreen();
  } catch (error) {
    console.error('register error', error);
  }
}

export default all([
  takeLatest(NAVIGATE_ACTIONS.GO_TO_LOGIN, goToLogin),
  takeLatest(NAVIGATE_ACTIONS.GO_TO_MAIN_SCREEN, goToMainScreen),
]);
