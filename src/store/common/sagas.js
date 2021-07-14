import {AppState} from 'react-native';
import {
  all,
  takeLatest,
  put,
  call,
  cancelled,
  select,
  take,
} from 'redux-saga/effects';
import {eventChannel} from 'redux-saga';
import NetInfo from '@react-native-community/netinfo';
import {firebase} from '@react-native-firebase/firestore';
// import {GoogleSignin} from '@react-native-google-signin/google-signin';
import moment from 'moment-timezone';

import {COMMON_ACTIONS, COMMON_REDUCER_ACTIONS} from './actions';
import {getOrgNews} from '@api/common';
import {showMainScreen} from '@navigation';
import {
  readBetaAccessExpiryDate,
  readOfflineFeatureExpiryDate,
  readProfileImageInStorage,
  readBokFeatureExpiryDate,
} from '@api/user';
import {
  getSansPaperUser,
  getSansPaperUserOrganisation,
  getUpviseUserList,
} from '@api/upvise';
import {SANSPAPER_REDUCER_ACTIONS} from '@store/sanspaper/';
import {FORM_SAGA_ACTIONS} from '@store/forms';
import {USER_SAGA_ACTIONS, USER_REDUCER_ACTIONS} from '../user';
import DB, * as database from '@database';
import {selectNetworkInfo} from '@selector/common';
import {selectEmail} from '@selector/user';
import {
  dismissActivityIndicator,
  updateProfileLoadingScreen,
} from '../../navigation';
import {getExtension} from '@util/string';

function subscribeAppStateChannel() {
  return eventChannel((emmiter) => {
    AppState.addEventListener('change', (state) => emmiter(state));
    return () => {};
  });
}

function subscribeNetworkStateChannel() {
  return eventChannel((emmiter) => {
    NetInfo.addEventListener((state) => emmiter(state));
    return () => {};
  });
}

function* init({payload}) {
  try {
    //init DB
    yield DB.openDBConnection();
    yield database.CreateTable();
    // yield database.deleteAllForms();

    //watch network and app state
    yield put({type: COMMON_ACTIONS.WATCH_APP_STATE});
    yield put({type: COMMON_ACTIONS.WATCH_NETWORK_STATE});

    //load Offline forms
    yield put({type: FORM_SAGA_ACTIONS.LOAD_OFFLINE_FORM});
    yield put({type: FORM_SAGA_ACTIONS.LOAD_OUTBOX});

    //getting user info
    const {uid, email} = payload._user;
    yield put({type: USER_SAGA_ACTIONS.UPDATE_USER_DETAILS, payload: payload});

    const spUser = yield getSansPaperUser({userId: uid});

    //define organisation path
    const organisationPath = yield spUser.data().organisations.path || '';

    yield put({
      type: SANSPAPER_REDUCER_ACTIONS.UPDATE_SANSPAPER_USER,
      payload: spUser,
    });

    //get latest news from db
    const newsPath = `${organisationPath}/announcements`;
    const newsList = yield getOrgNews(newsPath);

    yield put({type: COMMON_REDUCER_ACTIONS.UPDATE_NEWS, payload: newsList});
    showMainScreen();

    yield put({
      type: SANSPAPER_REDUCER_ACTIONS.UPDATE_SANSPAPER_ORGANISATION_PATH,
      payload: organisationPath,
    });

    // define upvise template path
    const upviseTemplatesPath = organisationPath + '/upviseTemplates';
    yield put({
      type: SANSPAPER_REDUCER_ACTIONS.UPDATE_UPVISE_TEMPLATE_PATH,
      payload: upviseTemplatesPath,
    });

    //get current SP user organisation
    const spOrganisation = yield getSansPaperUserOrganisation({
      organisationPath,
    });

    const {upviseUrl, upviseToken} = spOrganisation;
    const userList = yield getUpviseUserList(upviseUrl, upviseToken);
    put({
      type: SANSPAPER_REDUCER_ACTIONS.UPDATE_SANSPAPER_USER_LIST,
      payload: userList,
    });

    yield put({
      type: SANSPAPER_REDUCER_ACTIONS.UPDATE_SANSPAPER_ORGANISATION,
      payload: spOrganisation,
    });

    yield put({
      type: FORM_SAGA_ACTIONS.WATCH_FORM_UPDATES,
      payload: upviseTemplatesPath,
    });

    yield put({
      type: COMMON_REDUCER_ACTIONS.WATCH_NEWS_UPDATES,
      payload: newsPath,
    });

    yield put({
      type: USER_SAGA_ACTIONS.ON_USER_CHANGED,
    });

    // check offline feature access
    yield put({
      type: USER_SAGA_ACTIONS.ON_BETA_ACCESS_EXPIRY_DATE,
    });

    yield put({
      type: USER_SAGA_ACTIONS.ON_USER_ACCESS_OFFLINE_DATE,
      payload: email,
    });

    yield put({
      type: USER_SAGA_ACTIONS.ON_WATCH_BOK_SUBSCRIPTION,
      payload: email,
    });

    // load profile picture
    const profPic = yield spUser.data().profileImg || null;
    const extension = profPic ? getExtension(profPic).toLowerCase() : null;

    if (
      profPic &&
      ((extension && extension === 'jpg') || extension === 'jpeg')
    ) {
      yield put({
        type: USER_SAGA_ACTIONS.ON_LOAD_USER_PROFILE,
        payload: profPic,
      });
    } else {
      updateProfileLoadingScreen(false);
    }

    dismissActivityIndicator();
  } catch (error) {
    dismissActivityIndicator();
    // yield put({type: USER_ACTIONS.LOGIN_CODE, payload: 'sso/error-login'});
    // yield put({
    //   type: USER_ACTIONS.ERROR_SSO_USER,
    // });
    // yield auth().signOut();
    // yield GoogleSignin.revokeAccess();
    // yield GoogleSignin.signOut();
    console.log('init error', error);
  }
}

function subscribeToBodyOfKnowledge(formsRef, organisationPath) {
  return eventChannel((emmiter) => {
    formsRef.onSnapshot(async () => {
      const orgNews = await getOrgNews(organisationPath);
      emmiter(orgNews);
    });

    return () => formsRef;
  });
}

function* watchBodyOfKnowledgeUpdates({payload}) {
  const organisationPath = payload;
  const formsRef = yield firebase.firestore().collection(organisationPath);
  const news = yield call(
    subscribeToBodyOfKnowledge,
    formsRef,
    organisationPath,
  );

  try {
    while (true) {
      const newsList = yield take(news);

      yield put({
        type: COMMON_REDUCER_ACTIONS.UPDATE_NEWS,
        payload: newsList,
      });
    }
  } finally {
    if (yield cancelled()) {
      news.close();
    }
  }
}

function* watchOfflineFeatureExpiry() {
  try {
    const date = yield readOfflineFeatureExpiryDate();

    if (date) {
      const accessFeature = Date.now() < new Date(date) ? true : false;

      yield put({
        type: USER_REDUCER_ACTIONS.SET_USER_ACCESS_OFFLINE,
        payload: accessFeature,
      });
    } else {
      yield put({
        type: USER_REDUCER_ACTIONS.SET_USER_ACCESS_OFFLINE,
        payload: false,
      });
    }
  } catch (error) {
    yield put({
      type: USER_REDUCER_ACTIONS.SET_USER_ACCESS_OFFLINE,
      payload: false,
    });
    console.error('watchOfflineFeatureExpiry');
  }
}

function* watchBetaAccessExpiry() {
  try {
    const date = yield readBetaAccessExpiryDate();

    if (date) {
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
  } catch (error) {
    yield put({
      type: USER_REDUCER_ACTIONS.SET_BETA_ACCESS_EXPIRY,
      payload: false,
    });
    console.error('watchBetaAccessExpiry');
  }
}

function* watchBokAccessExpiry() {
  try {
    const date = yield readBokFeatureExpiryDate();

    if (date) {
      const expired = Date.now() < new Date(date) ? true : false;

      yield put({
        type: USER_REDUCER_ACTIONS.SET_USER_BOK_FEATURE,
        payload: expired,
      });
    } else {
      yield put({
        type: USER_REDUCER_ACTIONS.SET_USER_BOK_FEATURE,
        payload: false,
      });
    }
  } catch (error) {
    yield put({
      type: USER_REDUCER_ACTIONS.SET_USER_BOK_FEATURE,
      payload: false,
    });
    console.error('watchBokAccessExpiry');
  }
}

function* loadProfilePictureOffline() {
  try {
    const profilePicture = yield readProfileImageInStorage();

    yield put({
      type: USER_REDUCER_ACTIONS.UPDATE_PROFILE_PIC,
      payload: profilePicture,
    });

    updateProfileLoadingScreen(false);
  } catch (error) {
    updateProfileLoadingScreen(false);
  }
}

function* watchNetworkState() {
  const channel = yield call(subscribeNetworkStateChannel);
  try {
    while (true) {
      const dateNow = new Date();
      const networkState = yield take(channel);
      const {isInternetReachable} = networkState;
      const previousNetworkInfo = yield select(selectNetworkInfo);
      const userEmail = yield select(selectEmail);

      if (!isInternetReachable) {
        yield watchOfflineFeatureExpiry();
        yield watchBetaAccessExpiry();
        yield watchBokAccessExpiry();
        yield loadProfilePictureOffline();
      }

      if (!previousNetworkInfo.isInternetReachable && isInternetReachable) {
        const difference = moment().diff(
          moment(previousNetworkInfo.date),
          'seconds',
        );
        if (difference > 5) {
          // resend form if any
        }
      }
      const payload = {
        isInternetReachable,
        date: dateNow.toISOString(),
      };
      yield put({
        type: COMMON_REDUCER_ACTIONS.UPDATE_NETWORK_INFO,
        payload: payload,
      });

      yield put({
        type: USER_SAGA_ACTIONS.ON_USER_ACCESS_OFFLINE_DATE,
        payload: userEmail,
      });
    }
  } catch (error) {
    console.log('watchNetworkStatus error', error);
  } finally {
    if (yield cancelled()) {
      channel.close();
    }
  }
}
function* watchAppState() {
  const channel = yield call(subscribeAppStateChannel);
  yield put({
    type: COMMON_REDUCER_ACTIONS.UPDATE_APP_STATE,
    payload: 'active',
  });
  try {
    while (true) {
      const appState = yield take(channel);
      yield put({
        type: COMMON_REDUCER_ACTIONS.UPDATE_APP_STATE,
        payload: appState,
      });
      if (appState === 'active') {
        //check whether pending form to send
      }
    }
  } catch (error) {
    console.log('watchAppState error', error);
  } finally {
    if (yield cancelled()) {
      channel.close();
    }
  }
}

export default all([
  takeLatest(COMMON_ACTIONS.INIT, init),
  takeLatest(COMMON_ACTIONS.WATCH_APP_STATE, watchAppState),
  takeLatest(COMMON_ACTIONS.WATCH_NETWORK_STATE, watchNetworkState),
  takeLatest(
    COMMON_REDUCER_ACTIONS.WATCH_NEWS_UPDATES,
    watchBodyOfKnowledgeUpdates,
  ),
]);
