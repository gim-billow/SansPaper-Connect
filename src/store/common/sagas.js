import {all, takeLatest, put, call, cancelled, take} from 'redux-saga/effects';
import {eventChannel} from 'redux-saga';
import R from 'ramda';
import {firebase} from '@react-native-firebase/firestore';

import {COMMON_ACTIONS, COMMON_REDUCER_ACTIONS} from './actions';
import {getOrgNews} from '@api/common';
import {showMainScreen} from '@navigation';
import {
  getSansPaperUser,
  getSansPaperUserOrganisation,
  getUpviseUserList,
} from '@api/upvise';
import {USER_SAGA_ACTIONS} from '@store/user';
import {SANSPAPER_REDUCER_ACTIONS} from '@store/sanspaper/';
import {FORM_SAGA_ACTIONS} from '@store/forms';
import {diff} from '@util/general';

function* init({payload}) {
  try {
    //getting user info
    const {uid} = payload._user;
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
  } catch (error) {
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

export default all([
  takeLatest(COMMON_ACTIONS.INIT, init),
  takeLatest(
    COMMON_REDUCER_ACTIONS.WATCH_NEWS_UPDATES,
    watchBodyOfKnowledgeUpdates,
  ),
]);
