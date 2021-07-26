//Library
import {all, takeLatest, put, select} from 'redux-saga/effects';
import {NAVIGATE_ACTIONS} from './actions';
import {FORM_REDUCER_ACTIONS} from '@store/forms';
import crashlytics from '@react-native-firebase/crashlytics';
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
  selectOutbox,
  selectFormByCurrentId,
  selectCurrentFormId,
  selectCurrentLinkedItems,
  selectOfflineFormList,
  selectOfflineCurrentForm,
  selectOfflineCurrentFormId,
  selectOfflineCurrentLinkedItems,
  selectCurrentForm,
} from '@selector/form';
import {
  pushToLinkedItem,
  pushToFormFieldsScreen,
  pushToMapScreen,
  pushToOfflineFormFieldsScreen,
  pushToOfflineLinkedItem,
} from '@navigation/componentNavigation';
import {showActivityIndicator, dismissActivityIndicator} from 'navigation';
import * as database from '@database';
import * as R from 'ramda';

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
    crashlytics().log('goToLinkedItemScreen');
    showActivityIndicator();

    const {linkedTable} = payload;
    const currentFormId = yield select(selectCurrentFormId);
    const upviseTemplatePath = yield select(selectUpviseTemplatePath);
    const organisation = yield select(selectOrganistation);
    const currentFormInfo = yield select(selectFormByCurrentId);

    const fieldsPath = `${upviseTemplatePath}/${currentFormId}/upviseFields`;
    const currentFormFields = yield getFormFields({fieldsPath});
    const currentForm = R.assoc('fields', currentFormFields, currentFormInfo);

    const linkedItemName = UpviseTablesMap[linkedTable.toLowerCase()];
    const linkedItem = yield queryUpviseTable({
      table: linkedItemName,
      organisation,
    });

    console.log('goToLinkedItemScreen', linkedItem);
    yield put({
      type: FORM_REDUCER_ACTIONS.UPDATE_CURRENT_FORM,
      payload: currentForm,
    });

    yield put({
      type: FORM_REDUCER_ACTIONS.UPDATE_CURRENT_LINKED_TABLE,
      payload: linkedItem?.data?.items,
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
    crashlytics().recordError(error);
    console.log('getAllLinkedItems error', error);
  }
}

function* goToOfflineLinkedItemScreen({payload = {}}) {
  try {
    crashlytics().log('goToOfflineLinkedItemScreen');
    showActivityIndicator();
    const {linkedTable} = payload;
    const linkedItemName = UpviseTablesMap[linkedTable.toLowerCase()];
    const linkedItemsString = yield database.getLinkedItemsByid({
      linkedItemName: linkedItemName,
    });
    const linkedItems = JSON.parse(linkedItemsString);
    yield put({
      type: FORM_REDUCER_ACTIONS.UPDATE_OFFLINE_LINKED_TABLE,
      payload: linkedItems,
    });

    const offlineCurrentFormId = yield select(selectOfflineCurrentFormId);
    const offlineFormList = yield select(selectOfflineFormList);
    const formsData = R.find(R.propEq('id', offlineCurrentFormId))(
      offlineFormList,
    );

    yield put({
      type: FORM_REDUCER_ACTIONS.UPDATE_OFFLINE_CURRENT_FORM,
      payload: formsData,
    });

    const offlineLinkedItemPayload = {
      // componentId: screens.OfflineFormScreen,
      componentId: screens.FormScreen,
      passProps: {
        linkedItemName,
      },
    };

    dismissActivityIndicator();
    pushToOfflineLinkedItem(offlineLinkedItemPayload);
  } catch (error) {
    crashlytics().recordError(error);
    console.log('getAllLinkedItems error', error);
  }
}

function* goToOfflineFormFieldsScreen({payload = {}}) {
  try {
    crashlytics().log('goToOfflineFormFieldsScreen');
    showActivityIndicator();
    const {componentId, linkedItemId, formId} = payload;
    const offlineCurrentForm = yield select(selectOfflineCurrentForm);
    const currentLinkedItems = yield select(selectOfflineCurrentLinkedItems);
    const offlineFormList = yield select(selectOfflineFormList);
    const {name} = offlineCurrentForm;
    let subForm, currentForm, title, subTitle;

    if (formId) {
      currentForm = R.find(R.propEq('id', formId))(offlineFormList);

      yield put({
        type: FORM_REDUCER_ACTIONS.UPDATE_OFFLINE_CURRENT_FORM,
        payload: currentForm,
      });

      title = currentForm.name;
      subTitle = '';
    }

    if (linkedItemId) {
      let linkedId = null,
        updatedCurrentForm;

      if (Array.isArray(linkedItemId)) {
        linkedId = linkedItemId[0];

        currentForm = R.assoc('linkedid', linkedItemId, offlineCurrentForm);
        const currentLinkedItem = R.find(R.propEq('id', linkedItemId[0]))(
          currentLinkedItems,
        );
        updatedCurrentForm = R.assoc(
          'linkedItemName',
          currentLinkedItem.name,
          currentForm,
        );
      } else {
        linkedId = linkedItemId;

        currentForm = R.assoc('linkedid', linkedItemId, offlineCurrentForm);
        const currentLinkedItem = R.find(R.propEq('id', linkedItemId))(
          currentLinkedItems,
        );
        updatedCurrentForm = R.assoc(
          'linkedItemName',
          currentLinkedItem.name,
          currentForm,
        );
      }

      yield put({
        type: FORM_REDUCER_ACTIONS.UPDATE_OFFLINE_CURRENT_FORM,
        payload: updatedCurrentForm,
      });

      title = name;
      subForm = R.find(R.propEq('id', linkedId))(currentLinkedItems);
      subTitle = subForm?.hasOwnProperty('name') ? subForm.name : '';
    }

    const headerData = {
      title,
      subTitle,
    };

    dismissActivityIndicator();

    pushToOfflineFormFieldsScreen({
      componentId,
      headerData,
      passProps: {
        screen: 'offline',
      },
    });
  } catch (error) {
    crashlytics().recordError(error);
    console.log('loadFormFields error', error);
  }
}

function* goToDraftFormFieldsScreen({payload}) {
  try {
    crashlytics().log('goToDraftFormFieldsScreen');
    showActivityIndicator();

    const {draftId, navigate = false} = payload;
    const outboxList = yield select(selectOutbox);
    const formsData = R.find(R.propEq('id', draftId))(outboxList);
    const linkedItemName =
      UpviseTablesMap[formsData?.value?.linkedtable?.toLowerCase()];
    const linkedItemsString = yield database.getLinkedItemsByid({
      linkedItemName: linkedItemName,
    });
    const linkedItems = JSON.parse(linkedItemsString);

    yield put({
      type: FORM_REDUCER_ACTIONS.UPDATE_OFFLINE_CURRENT_FORM,
      payload: {...formsData.value, draftId: draftId},
    });

    if (navigate) {
      let subForm;
      const {name, linkedid} = formsData.value;
      if (linkedid) {
        let linkedId = null;

        if (Array.isArray(linkedid)) {
          linkedId = linkedid[0];
        } else {
          linkedId = linkedid;
        }

        subForm = R.find(R.propEq('id', linkedId))(linkedItems);
      }
      const subTitle = subForm?.hasOwnProperty('name') ? subForm.name : '';
      const headerData = {
        title: name,
        subTitle,
      };

      pushToOfflineFormFieldsScreen({
        componentId: screens.OfflineFormScreen,
        headerData,
        passProps: {
          draftId,
          outboxList,
          screen: 'outbox',
        },
      });
    }
    dismissActivityIndicator();
  } catch (error) {
    crashlytics().recordError(error);
    console.log('loadFormFields error', error);
  }
}

function* goToFormFieldsScreen({payload = {}}) {
  try {
    crashlytics().log('goToFormFieldsScreen');
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
      let itemId;

      if (Array.isArray(linkedItemId)) {
        itemId = linkedItemId[0];
      } else {
        itemId = linkedItemId;
      }

      const currentLinkedItem = R.find(R.propEq('id', itemId))(
        currentLinkedItems,
      );

      let updatedFormInfo = R.assoc('linkedid', itemId, currentFormInfo);
      updatedFormInfo = R.assoc(
        'linkedItemName',
        currentLinkedItem.name,
        updatedFormInfo,
      );
      currentForm = R.assoc('fields', currentFormFields, updatedFormInfo);
    } else {
      currentForm = R.assoc('fields', currentFormFields, currentFormInfo);
    }
    yield put({
      type: FORM_REDUCER_ACTIONS.UPDATE_CURRENT_FORM,
      payload: currentForm,
    });

    dismissActivityIndicator();
    pushToFormFieldsScreen({
      componentId,
      currentForm,
      currentLinkedItems,
      passProps: {
        screen: 'online',
      },
    });
  } catch (error) {
    crashlytics().recordError(error);
    console.log('loadFormFields error', error);
  }
}

function* goToGoogleMapScreen({payload = {}}) {
  try {
    crashlytics().log('goToGoogleMapScreen');

    const currentForm = yield select(selectCurrentForm);
    const fieldLength = R.length(currentForm.fields);

    const {setText, address} = payload;
    pushToMapScreen({
      componentId: fieldLength
        ? screens.FormFieldsScreen
        : screens.OfflineFormFieldsScreen,
      passProps: {
        setText,
        address,
      },
    });
  } catch (error) {
    crashlytics().recordError(error);
  }
}

export default all([
  takeLatest(NAVIGATE_ACTIONS.GO_TO_LOGIN, goToLogin),
  takeLatest(NAVIGATE_ACTIONS.GO_TO_LINK_ITEM_SCREEN, goToLinkedItemScreen),
  takeLatest(NAVIGATE_ACTIONS.GO_TO_FORM_FIELDS_SCREEN, goToFormFieldsScreen),
  takeLatest(NAVIGATE_ACTIONS.GO_TO_MAIN_SCREEN, goToMainScreen),
  takeLatest(NAVIGATE_ACTIONS.GO_TO_GOOGLE_MAPS, goToGoogleMapScreen),
  takeLatest(
    NAVIGATE_ACTIONS.GO_TO_OFFLINE_LINK_ITEM_SCREEN,
    goToOfflineLinkedItemScreen,
  ),
  takeLatest(
    NAVIGATE_ACTIONS.GO_TO_OFFLINE_FORM_FIELDS_SCREEN,
    goToOfflineFormFieldsScreen,
  ),
  takeLatest(
    NAVIGATE_ACTIONS.GO_TO_DRAFT_FORM_FIELDS_SCREEN,
    goToDraftFormFieldsScreen,
  ),
]);
