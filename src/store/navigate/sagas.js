//Library
import {all, takeLatest, put, select} from 'redux-saga/effects';
import {NAVIGATE_ACTIONS} from './actions';
import {FORM_REDUCER_ACTIONS} from '@store/forms';
import {assoc} from 'ramda';
import {screens} from '@constant/ScreenConstants';
import {showLoginScreen, showMainScreen} from '@navigation';
import {queryUpviseTable} from 'api/upvise';
import {getFormFields} from 'api/forms';
import {UpviseTablesMap} from '@constant/UpviseTablesMap';
import {
  selectOrganistation,
  selectUpviseTemplatePath,
} from '@selector/sanspaper';
import {selectFormByCurrentId, selectCurrentFormId} from '@selector/form';
import {
  pushToLinkedItem,
  pushToFormFieldsScreen,
} from '@navigation/componentNavigation';

function* goToLogin() {
  try {
    showLoginScreen();
  } catch (error) {
    console.error('register error', error);
  }
}

function* goToMainScreen() {
  try {
    showMainScreen();
  } catch (error) {
    console.error('register error', error);
  }
}

function* goToLinkedItemScreen({payload}) {
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

function* goToFormFieldsScreen({payload = {}}) {
  try {
    const {linkedItemId, componentId} = payload;
    const currentFormId = yield select(selectCurrentFormId);
    const upviseTemplatePath = yield select(selectUpviseTemplatePath);
    const currentFormInfo = yield select(selectFormByCurrentId);

    const fieldsPath = `${upviseTemplatePath}/${currentFormId}/upviseFields`;
    const currentFormFields = yield getFormFields({fieldsPath});
    console.log('currentFormFields', currentFormFields);
    let currentForm = {};
    if (linkedItemId && linkedItemId !== '') {
      const updatedFormInfo = assoc('linkedid', linkedItemId, currentFormInfo);
      currentForm = assoc('fields', currentFormFields, updatedFormInfo);
    } else {
      currentForm = assoc('fields', currentFormFields, currentFormInfo);
    }
    console.log('update current form', currentForm);
    yield put({
      type: FORM_REDUCER_ACTIONS.UPDATE_CURRENT_FORM,
      payload: currentForm,
    });

    console.log('push to form fields screen');
    pushToFormFieldsScreen({componentId});
  } catch (error) {
    console.log('loadFormFields error', error);
  }
}

export default all([
  takeLatest(NAVIGATE_ACTIONS.GO_TO_LOGIN, goToLogin),
  takeLatest(NAVIGATE_ACTIONS.GO_TO_LINK_ITEM_SCREEN, goToLinkedItemScreen),
  takeLatest(NAVIGATE_ACTIONS.GO_TO_FORM_FIELDS_SCREEN, goToFormFieldsScreen),
  takeLatest(NAVIGATE_ACTIONS.GO_TO_MAIN_SCREEN, goToMainScreen),
]);
