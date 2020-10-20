//library
import {all, takeLatest} from 'redux-saga/effects';

//redux
import {COMMON_ACTIONS} from './actions';

//import {DB_SAGA_ACTIONS} from 'store/database';

function* init({payload}) {
  try {
    console.log('init saga');
  } catch (error) {
    console.log('init error', error);
  }
}

export default all([takeLatest(COMMON_ACTIONS.INIT, init)]);
