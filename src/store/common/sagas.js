import {all, takeLatest, put} from 'redux-saga/effects';
import {map} from 'ramda';
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

function* init({payload}) {
  try {
    //getting user info
    const {uid} = payload._user;
    yield put({type: USER_SAGA_ACTIONS.UPDATE_USER_DETAILS, payload: payload});

    const spUser = yield getSansPaperUser({userId: uid});
    console.log('spUser ==> ', spUser);

    yield put({
      type: SANSPAPER_REDUCER_ACTIONS.UPDATE_SANSPAPER_USER,
      payload: spUser,
    });

    //get latest news from db
    const newsList = yield getOrgNews();
    const htmlNews = map(
      (newsItem) => '<h3>' + newsItem.title + '</h3>' + newsItem.news,
      newsList,
    );
    yield put({type: COMMON_REDUCER_ACTIONS.UPDATE_NEWS, payload: htmlNews});
    showMainScreen();

    //define organisation path
    const organisationPath = yield spUser.data().organisations.path || '';
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
    console.log('userList ===>> ', userList);
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
  } catch (error) {
    console.log('init error', error);
  }
}

export default all([takeLatest(COMMON_ACTIONS.INIT, init)]);
