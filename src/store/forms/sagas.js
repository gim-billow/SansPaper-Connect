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

import {getUpviseTemplate, getFormFields} from 'api/forms';
import {queryUpviseTable} from 'api/upvise';

import {UpviseTablesMap} from '@constant/UpviseTablesMap';
import {screens} from '@constant/ScreenConstants';
import {FORM_SAGA_ACTIONS, FORM_REDUCER_ACTIONS, FORM_ACTION} from './actions';

import {
  selectCurrentForm,
  selectFormByCurrentId,
  selectCurrentFormId,
} from '@selector/form';
import {
  selectOrganistation,
  selectUpviseTemplatePath,
} from '@selector/sanspaper';

import {
  pushToLinkedItem,
  pushToFormFieldsScreen,
} from '@navigation/componentNavigation';

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

function* loadLinkedItem({payload}) {
  try {
    const organisation = yield select(selectOrganistation);
    const linkedItemName = UpviseTablesMap[payload.toLowerCase()];
    const linkedItem = yield queryUpviseTable({
      table: linkedItemName,
      organisation,
    });
    yield put({
      type: FORM_REDUCER_ACTIONS.UPDATE_CURRENT_LINKED_TABLE,
      payload: linkedItem.data.items,
    });
    const linkedItemPayload = {
      componentId: screens.FormScreen,
      passProps: {
        linkedItemName,
      },
    };
    pushToLinkedItem(linkedItemPayload);
  } catch (error) {
    console.log('getAllLinkedItems error', error);
  }
}

function* loadFormFields({payload}) {
  try {
    const {linkedItemId} = payload;
    const currentFormId = yield select(selectCurrentFormId);
    const upviseTemplatePath = yield select(selectUpviseTemplatePath);
    const currentFormInfo = yield select(selectFormByCurrentId);

    const updatedFormInfo = assoc('linkedid', linkedItemId, currentFormInfo);

    const fieldsPath = `${upviseTemplatePath}/${currentFormId}/upviseFields`;
    const currentFormFields = yield getFormFields({fieldsPath});
    const currentForm = assoc('fields', currentFormFields, updatedFormInfo);

    yield put({
      type: FORM_REDUCER_ACTIONS.UPDATE_CURRENT_FORM,
      payload: currentForm,
    });

    pushToFormFieldsScreen({componentId: screens.LinkedItems});
  } catch (error) {
    console.log('loadFormFields error', error);
  }
}

function* updateFormFieldValue({payload}) {
  try {
    const {rank, value} = payload;
    const currentForm = yield select(selectCurrentForm);
    adjust(rank - 1, (i) => assoc('value', value, i), currentForm.fields);
  } catch (error) {
    console.log('loginUser error', error);
  }
}

export default all([
  takeLatest(FORM_SAGA_ACTIONS.LOAD_LINKED_TABLE_TO_STORE, loadLinkedItem),
  takeLatest(FORM_SAGA_ACTIONS.WATCH_FORM_UPDATES, watchFormsTemplatesUpdates),
  takeLatest(FORM_ACTION.LOAD_FORM_FIELDS, loadFormFields),
  takeLatest(FORM_ACTION.UPDATE_FORM_FIELD_VALUE, updateFormFieldValue),
]);
