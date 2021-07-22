import {Alert} from 'react-native';
import Toast from 'react-native-simple-toast';
import {
  put,
  all,
  takeLatest,
  select,
  call,
  take,
  delay,
  cancelled,
} from 'redux-saga/effects';
import {eventChannel} from 'redux-saga';
import crashlytics from '@react-native-firebase/crashlytics';
// import {GoogleSignin} from '@react-native-google-signin/google-signin';
// import auth from '@react-native-firebase/auth';

import {
  USER_ACTIONS,
  USER_SAGA_ACTIONS,
  USER_REDUCER_ACTIONS,
  logoutUser as onLogoutUser,
  resetLoginCode,
} from './actions';
import * as database from '@database';
import {
  login,
  logout,
  googleLogin,
  appleLogin,
  saveUserEmail,
  removeUserEmail,
  forgotPassword,
  signUpEmailUserInterest,
  profilePicUploadStorage,
  addProfImageToFirestore,
  loadProfilePicture,
  checkOfflineFeature,
  getSanspaperIdOfflineExpiry,
  saveBetaAccessExpiryDate,
  saveOfflineFeatureExpiryDate,
  removeOfflineFeatureExpiryDate,
  getBokFeatureExpiry,
  saveBokFeatureExpiryDate,
  removeBokFeatureExpiryDate,
  removeProfileImageInStorage,
} from 'api/user';
import {
  showActivityIndicator,
  dismissActivityIndicator,
  updateProfileLoadingScreen,
} from 'navigation';
import {selectSaveUser, selectUID} from '@selector/user';
import {selectUser} from '@selector/sanspaper';
import {selectNetworkInfo} from '@selector/common';
import {firebase} from '@react-native-firebase/firestore';
import {
  fetchSansPaperUser,
  updateChangePass,
  clearStorageUserId,
} from '@api/upvise';

function* loginUser({payload}) {
  try {
    crashlytics().log('loginUser');
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
    crashlytics().recordError(e);
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
    crashlytics().log('forgotPasswordUser');
    const {email} = payload;

    showActivityIndicator('Sending');

    yield forgotPassword(email);

    dismissActivityIndicator();
  } catch (error) {
    crashlytics().recordError(error);
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
    crashlytics().log('updateUserDetails');
    const {email, uid} = payload._user;
    yield put({type: USER_REDUCER_ACTIONS.UPDATE_LOGIN_STATUS, payload: true});
    yield put({type: USER_REDUCER_ACTIONS.UPDATE_USER_EMAIL, payload: email});
    yield put({type: USER_REDUCER_ACTIONS.UPDATE_USER_ID, payload: uid});
  } catch (error) {
    crashlytics().recordError(error);
    console.log('updateUserDetails saga error: ', error);
  }
}

function* logoutUser({payload}) {
  try {
    crashlytics().log('logoutUser');
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
    crashlytics().recordError(e);
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
      const {passchange = false, profileImg = null} = authUser.data();

      if (passchange) {
        yield put(onLogoutUser());
        yield put(resetLoginCode());
      }

      if (profileImg) {
        yield put({
          type: USER_SAGA_ACTIONS.ON_LOAD_USER_PROFILE,
          payload: profileImg,
        });
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
    crashlytics().log('signUpEmailUser');
    const {email} = payload;

    showActivityIndicator('Sending');

    const signUpResponse = yield signUpEmailUserInterest(email);
    if (signUpResponse.success) {
      Alert.alert('Alert', signUpResponse.message);
    }

    dismissActivityIndicator();
  } catch (error) {
    crashlytics().recordError(error);
    dismissActivityIndicator();
  }
}

function* saveProfilePic({payload}) {
  try {
    crashlytics().log('saveProfilePic');
    const base64Img = payload;
    const user = yield select(selectUser);
    const uid = yield select(selectUID);
    const networkInfo = yield select(selectNetworkInfo);

    if (!networkInfo.isInternetReachable) {
      Alert.alert('', 'Unable to upload. Internet is not available.');
      return;
    }

    updateProfileLoadingScreen(true);

    yield put({
      type: USER_REDUCER_ACTIONS.LOAD_PROFILE_PICTURE,
      payload: true,
    });

    let name = user?._data?.name;
    name = name.toUpperCase().replace(' ', '_');

    const filename = `${name}_${Date.now()}_PROFILE_IMG.jpg`;

    // save image to storage
    const uploadedImg = yield profilePicUploadStorage(filename, base64Img);

    yield put({
      type: USER_REDUCER_ACTIONS.UPDATE_PROFILE_PIC,
      payload: uploadedImg,
    });

    updateProfileLoadingScreen(false);

    Toast.show('Profile picture picture successfully set.');

    // add to profile image to user in firestore
    yield addProfImageToFirestore(uid, filename);
  } catch (error) {
    crashlytics().recordError(error);
    console.log('Error saveProfilePic', error);
    throw error;
  }
}

function* loadUserProfilePic({payload}) {
  const filename = payload;

  try {
    crashlytics().log('loadUserProfilePic');
    const networkInfo = yield select(selectNetworkInfo);

    if (networkInfo.isInternetReachable) {
      // load image from storage
      const uploadedImg = yield loadProfilePicture(filename);

      yield put({
        type: USER_REDUCER_ACTIONS.UPDATE_PROFILE_PIC,
        payload: uploadedImg,
      });

      yield delay(5000);
      updateProfileLoadingScreen(false);
    }
  } catch (error) {
    crashlytics().recordError(error);
    throw error;
  }
}

function subscribeOnBetaAccessExpiryDateChange(formsRef) {
  return eventChannel((emitter) => {
    formsRef.onSnapshot(async () => {
      const offline = await checkOfflineFeature();
      emitter(offline);
    });

    return () => formsRef;
  });
}

function* watchBetaAccessExpiryDate() {
  const formsRef = yield firebase.firestore().collection('sanspaperbeta');
  const betaAccessRef = yield call(
    subscribeOnBetaAccessExpiryDateChange,
    formsRef,
  );

  try {
    while (true) {
      const betaAccess = yield take(betaAccessRef);
      if (betaAccess.exists) {
        const betaAccessExpiryDate = betaAccess.data();
        const date = betaAccessExpiryDate.expiry.seconds * 1000;

        yield saveBetaAccessExpiryDate(date);

        const expired = Date.now() < new Date(date) ? true : false;

        yield put({
          type: USER_REDUCER_ACTIONS.SET_BETA_ACCESS_EXPIRY,
          payload: expired,
        });
      } else {
        yield put({
          type: USER_REDUCER_ACTIONS.SET_BETA_ACCESS_EXPIRY,
          payload: false,
        });
      }
    }
  } finally {
    if (yield cancelled()) {
      betaAccessRef.close();
    }
  }
}

function subscribeOnOfflineFeatureExpiryDateChange(formsRef, sanspaperId) {
  return eventChannel((emitter) => {
    formsRef.onSnapshot(async () => {
      const offline = await getSanspaperIdOfflineExpiry(sanspaperId);
      emitter(offline);
    });

    return () => formsRef;
  });
}

function* watchOfflineFeatureExpiryDate({payload}) {
  const sanspaperId = payload;

  const formsRef = yield firebase.firestore().collection('sanspaperid');
  const offlineFeatureRef = yield call(
    subscribeOnOfflineFeatureExpiryDateChange,
    formsRef,
    sanspaperId,
  );

  try {
    crashlytics().log('watchOfflineFeatureExpiryDate');

    while (true) {
      const offlineFeature = yield take(offlineFeatureRef);
      if (offlineFeature.exists) {
        const offlineFeatureExpiryDate = offlineFeature.data();
        const date = offlineFeatureExpiryDate.offline.seconds * 1000;

        yield saveOfflineFeatureExpiryDate(date);

        const accessFeature = Date.now() < new Date(date) ? true : false;

        yield put({
          type: USER_REDUCER_ACTIONS.SET_USER_ACCESS_OFFLINE,
          payload: accessFeature,
        });
      } else {
        yield removeOfflineFeatureExpiryDate();

        yield put({
          type: USER_REDUCER_ACTIONS.SET_USER_ACCESS_OFFLINE,
          payload: false,
        });
      }
    }
  } catch (error) {
    crashlytics().recordError(error);
    yield put({
      type: USER_REDUCER_ACTIONS.SET_USER_ACCESS_OFFLINE,
      payload: false,
    });
    console.log('watchOfflineFeatureExpiryDate error', error);
  } finally {
    if (yield cancelled()) {
      offlineFeatureRef.close();
    }
  }
}

function subscribeWatchBokAccess(formsRef, sanspaperId) {
  return eventChannel((emitter) => {
    formsRef.onSnapshot(async () => {
      const offline = await getBokFeatureExpiry(sanspaperId);
      emitter(offline);
    });

    return () => formsRef;
  });
}

function* watchBokAccess({payload}) {
  const sanspaperId = payload;

  const formsRef = yield firebase.firestore().collection('sanspaperbok');
  const bokFeatureRef = yield call(
    subscribeWatchBokAccess,
    formsRef,
    sanspaperId,
  );

  try {
    crashlytics().log('watchBokAccess');
    while (true) {
      const bokFeature = yield take(bokFeatureRef);
      if (bokFeature.exists) {
        const bokFeatureExpiryDate = bokFeature.data();
        const date = bokFeatureExpiryDate.expiry.seconds * 1000;

        yield saveBokFeatureExpiryDate(date);

        const accessFeature = Date.now() < new Date(date) ? true : false;

        yield put({
          type: USER_REDUCER_ACTIONS.SET_USER_BOK_FEATURE,
          payload: accessFeature,
        });
      } else {
        yield removeBokFeatureExpiryDate();

        yield put({
          type: USER_REDUCER_ACTIONS.SET_USER_BOK_FEATURE,
          payload: false,
        });
      }
    }
  } catch (error) {
    crashlytics().recordError(error);
    yield put({
      type: USER_REDUCER_ACTIONS.SET_USER_BOK_FEATURE,
      payload: false,
    });
    console.log('watchBokAccess error', error);
  } finally {
    if (yield cancelled()) {
      bokFeatureRef.close();
    }
  }
}

function* removeAllDownloadForms() {
  try {
    yield removeBokFeatureExpiryDate();
    yield removeOfflineFeatureExpiryDate();
    yield database.deleteAllForms();
    yield database.deleteAllOutbox();
  } catch (error) {
    throw error;
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
  takeLatest(USER_ACTIONS.SAVE_PROFILE_PIC, saveProfilePic),
  takeLatest(USER_SAGA_ACTIONS.ON_LOAD_USER_PROFILE, loadUserProfilePic),
  takeLatest(USER_ACTIONS.LOGOUT, logoutUser),
  takeLatest(
    USER_SAGA_ACTIONS.ON_BETA_ACCESS_EXPIRY_DATE,
    watchBetaAccessExpiryDate,
  ),
  takeLatest(
    USER_SAGA_ACTIONS.ON_USER_ACCESS_OFFLINE_DATE,
    watchOfflineFeatureExpiryDate,
  ),
  takeLatest(USER_SAGA_ACTIONS.ON_WATCH_BOK_SUBSCRIPTION, watchBokAccess),
  takeLatest(USER_ACTIONS.REMOVE_ALL_DOWNLOAD_FORMS, removeAllDownloadForms),
]);
