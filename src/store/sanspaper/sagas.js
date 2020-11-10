import {put, all, takeLatest} from 'redux-saga/effects';
import {USER_ACTIONS, USER_SAGA_ACTIONS, USER_REDUCER_ACTIONS} from './actions';
import {login} from 'api/user';
import {showActivityIndicator, dismissActivityIndicator} from 'navigation';

function* loginUser({payload}) {
  try {
    showActivityIndicator();
    // login the user
    const authResult = yield login(payload);
    dismissActivityIndicator();
  } catch (error) {
    dismissActivityIndicator();
  }
}

function* updateUserDetails({payload}) {
  try {
    const {email, uid} = payload._user;
    yield put({type: USER_REDUCER_ACTIONS.UPDATE_LOGIN_STATUS, payload: true});
    yield put({type: USER_REDUCER_ACTIONS.UPDATE_USER_EMAIL, payload: email});
    yield put({type: USER_REDUCER_ACTIONS.UPDATE_USER_ID, payload: uid});
  } catch (error) {
    console.log('updateUserDetails saga error: ', error);
  }
}
