import {combineReducers} from 'redux';
import {all} from 'redux-saga/effects';
import {commonReducer} from './common';
import {userReducer} from './user';
import {formReducer} from './forms';
import {sanspaperReducer} from './sanspaper';
import commonSaga from './common/sagas';
import navigateSaga from './navigate/sagas';
import userSaga from './user/sagas';
import sansPaperSaga from './sanspaper/sagas';
import formsSaga from './forms/sagas';

export const rootReducer = combineReducers({
  commonReducer,
  sanspaperReducer,
  userReducer,
  formReducer,
});

export function* rootSaga() {
  yield all([commonSaga, navigateSaga, userSaga, sansPaperSaga, formsSaga]);
}
