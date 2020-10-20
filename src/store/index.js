import {combineReducers} from 'redux';
import {all} from 'redux-saga/effects';
import {commonReducer} from './common';
import {userReducer} from './user';
import commonSaga from './common/sagas';
import navigateSaga from './navigate/sagas';
import userSaga from './user/sagas';

export const rootReducer = combineReducers({
  commonReducer,
  userReducer,
});

export function* rootSaga() {
  yield all([commonSaga, navigateSaga, userSaga]);
}
