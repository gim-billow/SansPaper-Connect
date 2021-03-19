import {put, all, takeLatest} from 'redux-saga/effects';
import {USER_ACTIONS, USER_SAGA_ACTIONS, USER_REDUCER_ACTIONS} from './actions';
import {login} from 'api/user';
import {showActivityIndicator, dismissActivityIndicator} from 'navigation';

function* loginUser({payload}) {
  try {
    showActivityIndicator();
    // login the user
    yield login(payload);
    dismissActivityIndicator();
    yield put({type: USER_ACTIONS.LOGIN_CODE, payload: 'success'});
  } catch (error) {
    yield put({type: USER_ACTIONS.LOGIN_CODE, payload: error.code});
    console.log('loginUser error', error.code);
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

function* logoutUser({payload}) {
  try {
    const {email, uid, status} = payload;
    yield put({
      type: USER_REDUCER_ACTIONS.UPDATE_LOGIN_STATUS,
      payload: status,
    });
    yield put({type: USER_REDUCER_ACTIONS.UPDATE_USER_EMAIL, payload: email});
    yield put({type: USER_REDUCER_ACTIONS.UPDATE_USER_ID, payload: uid});
  } catch (error) {
    console.log('userlogout saga error: ', error);
  }
}

export default all([
  takeLatest(USER_ACTIONS.LOGIN, loginUser),
  takeLatest(USER_SAGA_ACTIONS.UPDATE_USER_DETAILS, updateUserDetails),
  takeLatest(USER_ACTIONS.LOGOUT, logoutUser),
]);
