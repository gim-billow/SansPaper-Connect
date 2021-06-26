import {Alert} from 'react-native';
import {
  put,
  all,
  takeLatest,
  select,
  call,
  take,
  cancelled,
} from 'redux-saga/effects';
import {eventChannel} from 'redux-saga';
// import {GoogleSignin} from '@react-native-google-signin/google-signin';
// import auth from '@react-native-firebase/auth';

import {
  USER_ACTIONS,
  USER_SAGA_ACTIONS,
  USER_REDUCER_ACTIONS,
  logoutUser as onLogoutUser,
  resetLoginCode,
} from './actions';
import {
  login,
  logout,
  googleLogin,
  appleLogin,
  saveUserEmail,
  removeUserEmail,
  forgotPassword,
  signUpEmailUserInterest,
} from 'api/user';
import {clearStorageUserId} from 'api/upvise';
import {showActivityIndicator, dismissActivityIndicator} from 'navigation';
import {selectSaveUser} from '@selector/user';
import {selectNetworkInfo} from '@selector/common';
import {firebase} from '@react-native-firebase/firestore';
import {fetchSansPaperUser, updateChangePass} from '@api/upvise';

function* loginUser({payload}) {
  try {
    const saveUser = yield select(selectSaveUser);

    showActivityIndicator('Authenticating');
    // login the user
    yield login(payload);

    if (saveUser) {
      yield saveUserEmail({...payload, saveUser});
    } else {
      yield removeUserEmail();
    }

    // dismissActivityIndicator();
    yield put({type: USER_ACTIONS.LOGIN_CODE, payload: 'success'});
  } catch (e) {
    const saveUser = yield select(selectSaveUser);
    const networkInfo = yield select(selectNetworkInfo);

    if (saveUser) {
      yield saveUserEmail({...payload, saveUser});
    } else {
      yield removeUserEmail();
    }

    if (e.code === 'auth/wrong-password' || e.code === 'auth/user-not-found') {
      Alert.alert('', 'Username or password incorrect.');
      yield put({type: USER_ACTIONS.LOGIN_CODE, payload: e.code});
    } else if (e.code === 'auth/too-many-requests') {
      Alert.alert(
        '',
        'Too many failed attempts. Account is locked and require to change your password.',
      );
      yield put({type: USER_ACTIONS.LOGIN_CODE, payload: 'locked'});
    } else if (!networkInfo.isInternetReachable) {
      Alert.alert('', 'Internet is not available. Login once internet is back');
      yield put({type: USER_ACTIONS.LOGIN_CODE, payload: null});
    } else {
      Alert.alert('', 'Something went wrong.');
      yield put({type: USER_ACTIONS.LOGIN_CODE, payload: e.code});
    }

    dismissActivityIndicator();
  }
}

function* forgotPasswordUser({payload}) {
  try {
    const {email} = payload;

    showActivityIndicator('Sending');

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
    showActivityIndicator();
    const {email, uid, status, loginCode} = payload;

    // set changepass back to false
    yield updateChangePass();

    yield put({
      type: USER_REDUCER_ACTIONS.UPDATE_LOGIN_STATUS,
      payload: status,
    });
    yield put({type: USER_REDUCER_ACTIONS.UPDATE_USER_EMAIL, payload: email});
    yield put({type: USER_REDUCER_ACTIONS.UPDATE_USER_ID, payload: uid});
    yield put({type: USER_ACTIONS.LOGIN_CODE, payload: loginCode});

    yield clearStorageUserId();

    // const isSignedIn = yield GoogleSignin.isSignedIn();

    // if (isSignedIn) {
    //   yield GoogleSignin.revokeAccess();
    //   yield GoogleSignin.signOut();
    //   yield put({type: USER_ACTIONS.LOGIN_CODE, payload: 'sso/error-login'});
    //   yield put({
    //     type: USER_ACTIONS.ERROR_SSO_USER,
    //   });
    // } else {
    //   yield auth().signOut();
    // }

    yield logout();
  } catch (e) {
    if (e.code) {
      Alert.alert('', 'Something went wrong!');
    }

    dismissActivityIndicator();
  }
}

function subscribeOnUserChanged(formsRef) {
  return eventChannel((emitter) => {
    formsRef.onSnapshot(async () => {
      const users = await fetchSansPaperUser();
      emitter(users);
    });

    return () => formsRef;
  });
}

function* watchUserChangeUpdate() {
  const formsRef = yield firebase.firestore().collection('sanspaperusers');
  const user = yield call(subscribeOnUserChanged, formsRef);

  try {
    while (true) {
      const authUser = yield take(user);
      const {passchange} = authUser.data();

      if (passchange) {
        yield put(onLogoutUser());
        yield put(resetLoginCode());
      }
    }
  } finally {
    if (yield cancelled()) {
      user.close();
    }
  }
}

function* signUpEmailUser({payload}) {
  try {
    const {email} = payload;

    showActivityIndicator('Sending');

    const signUpResponse = yield signUpEmailUserInterest(email);
    if (signUpResponse.success) {
      Alert.alert('Alert', signUpResponse.message);
    }

    dismissActivityIndicator();
  } catch (error) {
    dismissActivityIndicator();
  }
}

export default all([
  takeLatest(USER_SAGA_ACTIONS.ON_USER_CHANGED, watchUserChangeUpdate),
  takeLatest(USER_ACTIONS.LOGIN, loginUser),
  takeLatest(USER_ACTIONS.FORGO_PASSWORD, forgotPasswordUser),
  takeLatest(USER_ACTIONS.SIGN_UP_EMAIL, signUpEmailUser),
  takeLatest(USER_ACTIONS.GOOGLE_LOGIN, loginWithGoogle),
  takeLatest(USER_ACTIONS.APPLE_LOGIN, loginWithApple),
  takeLatest(USER_SAGA_ACTIONS.UPDATE_USER_DETAILS, updateUserDetails),
  takeLatest(USER_ACTIONS.LOGOUT, logoutUser),
]);
