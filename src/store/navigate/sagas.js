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
import {
  selectFormByCurrentId,
  selectCurrentFormId,
  selectCurrentLinkedItems,
} from '@selector/form';
import {
  pushToLinkedItem,
  pushToFormFieldsScreen,
  pushToMapScreen,
} from '@navigation/componentNavigation';
import {showActivityIndicator, dismissActivityIndicator} from 'navigation';

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

function* goToLinkedItemScreen({payload = {}}) {
  try {
    showActivityIndicator();
    const {linkedTable} = payload;
    const currentFormId = yield select(selectCurrentFormId);
    const upviseTemplatePath = yield select(selectUpviseTemplatePath);
    const organisation = yield select(selectOrganistation);
    const currentFormInfo = yield select(selectFormByCurrentId);

    const fieldsPath = `${upviseTemplatePath}/${currentFormId}/upviseFields`;
    const currentFormFields = yield getFormFields({fieldsPath});
    const currentForm = assoc('fields', currentFormFields, currentFormInfo);

    const linkedItemName = UpviseTablesMap[linkedTable.toLowerCase()];
    const linkedItem = yield queryUpviseTable({
      table: linkedItemName,
      organisation,
    });

    yield put({
      type: FORM_REDUCER_ACTIONS.UPDATE_CURRENT_FORM,
      payload: currentForm,
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

    dismissActivityIndicator();
    pushToLinkedItem(linkedItemPayload);
  } catch (error) {
    console.log('getAllLinkedItems error', error);
  }
}

function* goToFormFieldsScreen({payload = {}}) {
  try {
    showActivityIndicator();
    const {linkedItemId, componentId} = payload;
    const currentFormId = yield select(selectCurrentFormId);
    const upviseTemplatePath = yield select(selectUpviseTemplatePath);
    const currentFormInfo = yield select(selectFormByCurrentId);
    const currentLinkedItems = yield select(selectCurrentLinkedItems);

    const fieldsPath = `${upviseTemplatePath}/${currentFormId}/upviseFields`;
    const currentFormFields = yield getFormFields({fieldsPath});
    let currentForm = {};
    if (linkedItemId && linkedItemId !== '') {
      const updatedFormInfo = assoc('linkedid', linkedItemId, currentFormInfo);
      currentForm = assoc('fields', currentFormFields, updatedFormInfo);
    } else {
      currentForm = assoc('fields', currentFormFields, currentFormInfo);
    }
    yield put({
      type: FORM_REDUCER_ACTIONS.UPDATE_CURRENT_FORM,
      payload: currentForm,
    });

    dismissActivityIndicator();
    pushToFormFieldsScreen({componentId, currentForm, currentLinkedItems});
  } catch (error) {
    console.log('loadFormFields error', error);
  }
}

function* goToGoogleMapScreen({payload = {}}) {
  try {
    const {componentId} = payload;
    pushToMapScreen({componentId});
  } catch (error) {}
}

export default all([
  takeLatest(NAVIGATE_ACTIONS.GO_TO_LOGIN, goToLogin),
  takeLatest(NAVIGATE_ACTIONS.GO_TO_LINK_ITEM_SCREEN, goToLinkedItemScreen),
  takeLatest(NAVIGATE_ACTIONS.GO_TO_FORM_FIELDS_SCREEN, goToFormFieldsScreen),
  takeLatest(NAVIGATE_ACTIONS.GO_TO_MAIN_SCREEN, goToMainScreen),
  takeLatest(NAVIGATE_ACTIONS.GO_TO_GOOGLE_MAPS, goToGoogleMapScreen),
]);
