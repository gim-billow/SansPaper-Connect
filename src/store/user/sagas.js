import {put, all, takeLatest, select} from 'redux-saga/effects';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

import {USER_ACTIONS, USER_SAGA_ACTIONS, USER_REDUCER_ACTIONS} from './actions';
import {
  login,
  googleLogin,
  appleLogin,
  saveUserEmail,
  removeUserEmail,
  forgotPassword,
} from 'api/user';
import {showActivityIndicator, dismissActivityIndicator} from 'navigation';
import {selectSaveUser} from '@selector/user';

function* loginUser({payload}) {
  try {
    const saveUser = yield select(selectSaveUser);

    showActivityIndicator();
    // login the user
    yield login(payload);

    if (saveUser) {
      yield saveUserEmail({...payload, saveUser});
    } else {
      yield removeUserEmail();
    }

    dismissActivityIndicator();
    yield put({type: USER_ACTIONS.LOGIN_CODE, payload: 'success'});
  } catch (error) {
    yield put({type: USER_ACTIONS.LOGIN_CODE, payload: error.code});
    console.log('loginUser error', error.code);
    dismissActivityIndicator();
  }
}

function* forgotPasswordUser({payload}) {
  try {
    const {email} = payload;

    showActivityIndicator();

    yield forgotPassword(email);

    dismissActivityIndicator();
  } catch (error) {
    dismissActivityIndicator();
  }
}

function* loginWithGoogle() {
  try {
    // login using google
    yield googleLogin();

    yield put({type: USER_ACTIONS.LOGIN_CODE, payload: 'success'});
  } catch (error) {
    yield put({type: USER_ACTIONS.LOGIN_CODE, payload: error.code});
    console.log('loginWithGoogle error', error.code);
  }
}

function* loginWithApple() {
  try {
    // login using apple
    yield appleLogin();

    yield put({type: USER_ACTIONS.LOGIN_CODE, payload: 'success'});
  } catch (error) {
    yield put({type: USER_ACTIONS.LOGIN_CODE, payload: error.code});
    console.log('loginWithApple error', error.code);
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
    const {email, uid, status, loginCode} = payload;

    yield put({
      type: USER_REDUCER_ACTIONS.UPDATE_LOGIN_STATUS,
      payload: status,
    });
    yield put({type: USER_REDUCER_ACTIONS.UPDATE_USER_EMAIL, payload: email});
    yield put({type: USER_REDUCER_ACTIONS.UPDATE_USER_ID, payload: uid});
    yield put({type: USER_ACTIONS.LOGIN_CODE, payload: loginCode});

    const isSignedIn = yield GoogleSignin.isSignedIn();

    if (isSignedIn) {
      yield GoogleSignin.revokeAccess();
      yield GoogleSignin.signOut();
      yield put({type: USER_ACTIONS.LOGIN_CODE, payload: 'sso/error-login'});
      yield put({
        type: USER_ACTIONS.ERROR_SSO_USER,
      });
    } else {
      yield auth().signOut();
    }
  } catch (error) {
    console.log('userlogout saga error: ', error);
  }
}

export default all([
  takeLatest(USER_ACTIONS.LOGIN, loginUser),
  takeLatest(USER_ACTIONS.FORGO_PASSWORD, forgotPasswordUser),
  takeLatest(USER_ACTIONS.GOOGLE_LOGIN, loginWithGoogle),
  takeLatest(USER_ACTIONS.APPLE_LOGIN, loginWithApple),
  takeLatest(USER_SAGA_ACTIONS.UPDATE_USER_DETAILS, updateUserDetails),
  takeLatest(USER_ACTIONS.LOGOUT, logoutUser),
]);
