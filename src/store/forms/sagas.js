//Library
import {
  all,
  call,
  take,
  takeLatest,
  cancelled,
  put,
  select,
} from 'redux-saga/effects';
import {firebase} from '@react-native-firebase/firestore';
import {assoc, adjust} from 'ramda';
import {eventChannel} from 'redux-saga';

import {getUpviseTemplate} from 'api/forms';
import {FORM_SAGA_ACTIONS, FORM_REDUCER_ACTIONS, FORM_ACTION} from './actions';
import {selectCurrentForm} from '@selector/form';

function subscribeToFormsCollections(formsRef, organisationPath) {
  return eventChannel((emmiter) => {
    formsRef.onSnapshot(async () => {
      const upviseTemplates = await getUpviseTemplate({organisationPath});
      emmiter(upviseTemplates);
    });

    return () => formsRef;
  });
}

function* watchFormsTemplatesUpdates({payload}) {
  const organisationPath = payload;
  const formsRef = yield firebase.firestore().collection(organisationPath);
  const channel = yield call(
    subscribeToFormsCollections,
    formsRef,
    organisationPath,
  );

  try {
    while (true) {
      const forms = yield take(channel);
      yield put({type: FORM_REDUCER_ACTIONS.UPDATE_FORM_LIST, payload: forms});
    }
  } finally {
    if (yield cancelled()) {
      channel.close();
    }
  }
}

function* updateFormFieldValue({payload}) {
  try {
    const {rank, value} = payload;
    const currentForm = yield select(selectCurrentForm);
    const updatedForm = adjust(
      rank - 1,
      (i) => assoc('value', value, i),
      currentForm.fields,
    );
    yield put({
      type: FORM_REDUCER_ACTIONS.UPDATE_CURRENT_FORM_FIELDS,
      payload: updatedForm,
    });
  } catch (error) {
    console.log('loginUser error', error);
  }
}

export default all([
  takeLatest(FORM_SAGA_ACTIONS.WATCH_FORM_UPDATES, watchFormsTemplatesUpdates),
  takeLatest(FORM_ACTION.UPDATE_FORM_FIELD_VALUE, updateFormFieldValue),
]);
