import {
  Alert,
  Platform,
  PermissionsAndroid,
  Linking,
  ToastAndroid,
} from 'react-native';
import {
  all,
  call,
  take,
  takeLatest,
  cancelled,
  put,
  select,
  delay,
} from 'redux-saga/effects';
import {Navigation} from 'react-native-navigation';
import {firebase} from '@react-native-firebase/firestore';
// import {
//   assoc,
//   map,
//   adjust,
//   find,
//   propEq,
//   forEach,
//   includes,
//   findIndex,
// } from 'ramda';
import * as R from 'ramda';
import {eventChannel} from 'redux-saga';
import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoding';
import moment from 'moment';
import 'react-native-get-random-values';
import {nanoid} from 'nanoid';

import AlertMessages from '@constant/AlertMessages';
import {getUpviseTemplate, getFormFields} from '@api/forms';
import {submitUpviseForm, queryUpviseTable} from '@api/upvise';
import {UpviseTablesMap} from '@constant/UpviseTablesMap';
import {screens} from '@constant/ScreenConstants';
import {getQueryByOptions} from '@components/Fields/Select/helper';
import {
  FORM_SAGA_ACTIONS,
  FORM_REDUCER_ACTIONS,
  FORM_ACTION,
  updateSubmitTriggered,
  updateScrollToMandatory,
  updateSubmittingForm,
} from './actions';
import {
  selectCurrentForm,
  selectCurrentFormUnfillMandatoryFields,
  selectOfflineCurrentFormUnfillMandatoryFields,
  selectOfflineStartAndFinishDate,
  selectStartAndFinishDate,
  selectFormList,
  selectOfflineCurrentForm,
  selectOfflineFormList,
} from '@selector/form';
import {
  selectOrganistation,
  selectUpviseTemplatePath,
} from '@selector/sanspaper';
import {selectNetworkInfo, selectActiveScreen} from '@selector/common';
import {showActivityIndicator, dismissActivityIndicator} from 'navigation';
import {selectType, projectDependant} from './contants';
import * as database from '@database';
import {activeScreen} from '../common';

async function hasLocationPermissionIOS() {
  const openSetting = () => {
    Linking.openSettings().catch(() => {
      Alert.alert('Unable to open settings');
    });
  };
  const status = await Geolocation.requestAuthorization('whenInUse');

  if (status === 'granted') {
    return true;
  }

  if (status === 'denied') {
    Alert.alert('Location permission denied');
  }

  if (status === 'disabled') {
    Alert.alert(
      'Turn on Location Services to allow sanspaper to determine your location.',
      '',
      [
        {text: 'Go to Settings', onPress: openSetting},
        {text: "Don't Use Location", onPress: () => {}},
      ],
    );
  }

  return false;
}

export async function hasLocationPermission() {
  if (Platform.OS === 'ios') {
    const hasPermission = await hasLocationPermissionIOS();
    return hasPermission;
  }

  if (Platform.OS === 'android' && Platform.Version < 23) {
    return true;
  }

  const hasPermission = await PermissionsAndroid.check(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  );

  if (hasPermission) {
    return true;
  }

  const status = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  );

  if (status === PermissionsAndroid.RESULTS.GRANTED) {
    return true;
  }

  if (status === PermissionsAndroid.RESULTS.DENIED) {
    ToastAndroid.show('Location permission denied by user.', ToastAndroid.LONG);
  } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
    ToastAndroid.show(
      'Location permission revoked by user.',
      ToastAndroid.LONG,
    );
  }

  return false;
}

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
      yield put({
        type: FORM_REDUCER_ACTIONS.UPDATE_FORM_LIST,
        payload: forms,
      });
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
    const updatedForm = R.adjust(
      rank - 1,
      (i) => R.assoc('value', value, i),
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

function* updateOfflineFormFieldValue({payload}) {
  try {
    const {rank, value} = payload;
    const currentForm = yield select(selectOfflineCurrentForm);
    const updatedForm = R.adjust(
      rank - 1,
      (i) => R.assoc('value', value, i),
      currentForm.fields,
    );
    yield put({
      type: FORM_REDUCER_ACTIONS.UPDATE_OFFLINE_CURRENT_FORM_FIELDS,
      payload: updatedForm,
    });
  } catch (error) {
    console.log('loginUser error', error);
  }
}

async function submitForm(form, screen) {
  try {
    // showActivityIndicator();
    const permission = await hasLocationPermission();
    if (permission) {
      Geolocation.getCurrentPosition(
        async (position) => {
          const geo =
            '' + position.coords.latitude + ',' + position.coords.longitude;
          let updatedForm = R.assoc('geo', geo, form);

          const addr = await Geocoder.from([
            position.coords.latitude,
            position.coords.longitude,
          ]);

          updatedForm = R.assoc(
            'address',
            addr.results[0].formatted_address,
            updatedForm,
          );

          let isSubmitted = await submitUpviseForm(updatedForm);

          if (isSubmitted) {
            dismissActivityIndicator();

            if (screen === 'outbox') {
              Navigation.popToRoot(screens.OfflineFormScreen);
            } else {
              Navigation.popToRoot(screens.FormScreen);
            }

            Alert.alert('', 'Form submitted and saved to outbox');
          } else {
            dismissActivityIndicator();
            Alert.alert('', 'Form not submitted');
          }
        },
        (error) => {
          dismissActivityIndicator();
          Alert.alert(
            '',
            'Unable to retrieve your current location, please check if GPS is turn on and try again, form not submitted',
          );
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 15000},
      );
    } else {
      dismissActivityIndicator();
      Alert.alert('', 'Location Permission Error: Form not submitted');
    }

    // dismissActivityIndicator();
  } catch (error) {
    // dismissActivityIndicator();
    Alert.alert('', 'Error submitting form, please contact support');
  }
}

function* preSubmitForm({payload}) {
  try {
    showActivityIndicator();

    // if there is no internet
    const {isInternetReachable} = yield select(selectNetworkInfo);
    const screen = yield select(selectActiveScreen);
    if (!isInternetReachable) {
      dismissActivityIndicator();
      Alert.alert(
        '',
        'Internet is not available at the moment. Please check your internet.',
      );
      yield put(activeScreen(''));
      return;
    }

    yield put(updateSubmittingForm(true));

    const alertConfig = [
      {
        text: 'Ok',
        style: 'cancel',
      },
    ];
    const offline = payload;
    let form = {};
    let unfilledMandatoryFields = {};
    let startAndFinishDateTime = {};

    if (offline) {
      form = yield select(selectOfflineCurrentForm);
      unfilledMandatoryFields = yield select(
        selectOfflineCurrentFormUnfillMandatoryFields,
      );
      startAndFinishDateTime = yield select(selectOfflineStartAndFinishDate);
    } else {
      form = yield select(selectCurrentForm);
      unfilledMandatoryFields = yield select(
        selectCurrentFormUnfillMandatoryFields,
      );
      startAndFinishDateTime = yield select(selectStartAndFinishDate);
    }

    /**
     * convert value object to string and get the new value string
     */
    form = {...form};
    const newFormFields = [...form.fields];
    const newFields = newFormFields.map((field) => {
      if (field.type === 'drawing') {
        const newField = {...field, value: ''};
        newField.value = field.value.newValue || '';
        field = {...newField};
      }
      return field;
    });
    form.fields = newFields;

    let dateTimeError = '';
    const {
      mandatoryError,
      dateTimeErrorMessage,
      hoursExceededError,
    } = AlertMessages;

    // check if there is an empty value in a mandatory field
    if (unfilledMandatoryFields.length > 0) {
      dismissActivityIndicator();
      const {rank} = unfilledMandatoryFields[0];
      const scrollToIndex = rank === 1 ? rank : rank - 1;
      yield put(updateSubmitTriggered());
      yield put(updateScrollToMandatory(scrollToIndex));

      yield Alert.alert('', mandatoryError, alertConfig, {
        cancelable: false,
      });
      yield put(activeScreen(''));
      yield put(updateSubmittingForm(false));
    } else {
      let scrollToIndex = null;
      R.forEach(({startDateTime, finishDateTime, rank}) => {
        const hours = moment
          .duration(finishDateTime - startDateTime, 'milliseconds')
          .asHours();
        // alert if finish date time is greater than start date time
        if (
          startDateTime &&
          finishDateTime &&
          finishDateTime - startDateTime <= 0
        ) {
          scrollToIndex = rank;
          dateTimeError = 'dateTimeError';
        } else if (hours >= 20) {
          scrollToIndex = rank;
          dateTimeError = 'hoursExceededError';
        }
      }, startAndFinishDateTime);

      if (dateTimeError === 'dateTimeError') {
        dismissActivityIndicator();
        yield put(updateSubmitTriggered());
        yield put(updateScrollToMandatory(scrollToIndex));
        yield Alert.alert('', dateTimeErrorMessage, alertConfig, {
          cancelable: false,
        });
        yield put(activeScreen(''));
        yield put(updateSubmittingForm(false));
      } else if (dateTimeError === 'hoursExceededError') {
        dismissActivityIndicator();
        yield put(updateSubmitTriggered());
        yield put(updateScrollToMandatory(scrollToIndex));
        yield Alert.alert(
          '',
          hoursExceededError,
          [
            {
              text: 'No',
              style: 'cancel',
            },
            {
              text: 'Yes',
              onPress: async () => {
                // showActivityIndicator();
                submitForm(form, screen);
                // Navigation.popToRoot(screens.FormScreen);
              },
            },
          ],
          {cancelable: false},
        );
        yield put(activeScreen(''));
        yield put(updateSubmittingForm(false));
      } else {
        submitForm(form, screen);
        // Navigation.popToRoot(screens.FormScreen);
      }
    }

    if (!dateTimeError && unfilledMandatoryFields.length <= 0) {
      // sync form to offline
      const offlineForms = yield select(selectOfflineFormList);
      const offlineFormIndex = R.findIndex(R.propEq('id', form.id))(
        offlineForms,
      );
      if (offlineFormIndex === -1) {
        yield syncOfflineForm({
          payload: {
            linkedTable: form.linkedtable,
            formId: form.id,
            dlFirst: true,
            submitSync: 'submitted',
          },
        });
      } else {
        yield saveAsDraft({
          payload: {
            offline,
            status: 'submitted',
          },
        });
      }
    }

    // dismissActivityIndicator();
  } catch (error) {
    // save to draft if submit failed
    yield saveAsDraft({
      payload: {
        offline: false,
        status: 'pending',
      },
    });

    dismissActivityIndicator();
    yield put(updateSubmittingForm(false));

    console.log('submitForm error', error);
  }
}

function* syncOfflineForm({payload = {}}) {
  try {
    const {
      linkedTable,
      formId,
      dlFirst = false,
      submitSync = null,
      multiple = false,
    } = payload;
    if (!multiple) {
      showActivityIndicator();
    }
    const dateNow = new Date();
    const upviseTemplatePath = yield select(selectUpviseTemplatePath);
    const organisation = yield select(selectOrganistation);
    const forms = yield select(selectFormList);
    const selectedForm = R.find(R.propEq('id', formId))(forms);
    const fieldsPath = `${upviseTemplatePath}/${formId}/upviseFields`;

    //sync forms
    const currentFormFields = yield getFormFields({fieldsPath});
    const currentForm = R.assoc('fields', currentFormFields, selectedForm);
    const currentFormPayload = {
      id: formId,
      createdAt: dateNow.toISOString(),
      updatedAt: dateNow.toISOString(),
      value: JSON.stringify(currentForm),
    };
    yield database.InsertForm(currentFormPayload);
    //sync linked item
    if (linkedTable && linkedTable !== '') {
      const linkedItemName =
        UpviseTablesMap[payload?.linkedTable.toLowerCase()];
      const linkedItems = yield queryUpviseTable({
        table: linkedItemName,
        organisation,
      });

      if (linkedItems?.data) {
        //console.log('linkedItems?.data', linkedItems?.data);
        const {lastBuildDate, items} = linkedItems?.data;
        //console.log('items', items);
        const linkedItemsDBPayload = {
          id: linkedItemName,
          createdAt: lastBuildDate,
          updatedAt: lastBuildDate,
          value: JSON.stringify(items),
        };
        yield database.InsertLinkedItems(linkedItemsDBPayload);
      }
    }

    //sync forms fields
    let projectList = [];
    for (const field of currentFormFields) {
      const {seloptions, type} = field;

      if (R.includes(type, selectType)) {
        let isProjectDependant = false;
        for (const project of projectDependant) {
          if (R.includes(project, seloptions)) {
            isProjectDependant = true;
          }
        }
        if (isProjectDependant) {
          for (const project of projectList) {
            const options = yield getQueryByOptions(
              seloptions,
              type,
              organisation,
              project.id,
            );
            const selectOptionsPayload = {
              formId,
              seloptions,
              projectId: project.id,
              type,
              value: JSON.stringify(options),
            };
            database.InsertSelectOptions(selectOptionsPayload);
          }
        } else {
          const options = yield getQueryByOptions(
            seloptions,
            type,
            organisation,
            '',
          );
          //storing project list to iterate for milestone and categorytools
          if (options) {
            const selectOptionsPayload = {
              formId,
              seloptions,
              projectId: '',
              type,
              value: JSON.stringify(options),
            };
            database.InsertSelectOptions(selectOptionsPayload);
          }
        }
      }
    }

    if (!multiple) {
      if (dlFirst) {
        yield saveAsDraft({
          payload: {
            offline: false,
            status: submitSync || 'draft',
          },
        });
      }

      yield put({type: FORM_SAGA_ACTIONS.LOAD_OFFLINE_FORM});
      dismissActivityIndicator();
    }
  } catch (error) {
    const {multiple = false} = payload;
    if (!multiple) {
      dismissActivityIndicator();
    }
    console.log('error', error);
  }
}

// function* loadFormFields({payload = {}}) {
//   try {
//     const {rank, value} = payload;
//     const currentForm = yield select(selectCurrentForm);
//     const updatedForm = R.adjust(
//       rank - 1,
//       (i) => R.assoc('value', value, i),
//       currentForm.fields,
//     );
//     yield put({
//       type: FORM_REDUCER_ACTIONS.UPDATE_CURRENT_FORM_FIELDS,
//       payload: updatedForm,
//     });
//   } catch (error) {
//     console.log('loginUser error', error);
//   }
// }

function* loadOfflineForms() {
  const offlineFormsString = yield database.getOfflineForms();
  const offlineForms = R.map(
    (form) => JSON.parse(form.value),
    offlineFormsString,
  );

  yield put({
    type: FORM_REDUCER_ACTIONS.UPDATE_OFFLINE_FORM_LIST,
    payload: offlineForms,
  });
}

function* loadOutbox() {
  const outboxString = yield database.getAllFromOutbox();
  const outboxItems = R.map(
    (outbox) => ({...outbox, value: JSON.parse(outbox.value)}),
    outboxString,
  );

  yield put({
    type: FORM_REDUCER_ACTIONS.UPDATE_OUTBOX_LIST,
    payload: outboxItems,
  });
}

function* loadOutboxByStatus({payload}) {
  try {
    const outboxString = yield database.getOutboxFormsByStatus({
      status: payload,
    });
    const outboxItems = R.map(
      (outbox) => ({...outbox, value: JSON.parse(outbox.value)}),
      outboxString,
    );

    yield put({
      type: FORM_REDUCER_ACTIONS.UPDATE_OUTBOX_LIST,
      payload: outboxItems,
    });
  } catch (error) {
    console.log('loadOutboxByStatus error', error);
  }
}

function* saveAsDraft({payload}) {
  try {
    const dateNow = new Date();

    const {offline, status, changeStatus = false, filterBy = 'all'} = payload;

    let form = {};
    if (offline) {
      form = yield select(selectOfflineCurrentForm);
    } else {
      form = yield select(selectCurrentForm);
    }
    const {draftId = null, ...payloadForm} = form;
    const dbPayload = {
      id: draftId ? draftId : nanoid(),
      createdAt: dateNow.toISOString(),
      updatedAt: dateNow.toISOString(),
      value: JSON.stringify(payloadForm),
      status,
    };

    yield database.InsertToOutbox(dbPayload);
    if (changeStatus) {
      if (filterBy === 'all') {
        yield put({type: FORM_SAGA_ACTIONS.LOAD_OUTBOX});
      } else {
        yield put({
          type: FORM_SAGA_ACTIONS.LOAD_OUTBOX_BY_STATUS,
          payload: status === 'draft' ? 'pending' : 'draft',
        });
      }
      yield Alert.alert('', 'Form status changed.');
      return;
    }

    yield put({type: FORM_SAGA_ACTIONS.LOAD_OUTBOX});

    if (status === 'draft' && !changeStatus) {
      yield Alert.alert('', 'Form saved as draft.');
      Navigation.popToRoot(screens.FormScreen);
    } else if (status === 'pending' && !changeStatus) {
      yield Alert.alert('', 'Form saved as pending.');
      Navigation.popToRoot(screens.FormScreen);
    }
  } catch (error) {
    yield Alert.alert('', 'Form not saved. Something went wrong!');
    console.log('saveAsDraft error', error);
  }
}

function* deleteOfflineForm({payload}) {
  try {
    const formId = payload;
    yield database.deleteFormById({formId: formId});
    yield put({type: FORM_SAGA_ACTIONS.LOAD_OFFLINE_FORM});
  } catch (error) {
    yield Alert.alert('', 'Error in deleting the offline form');
    console.log('deleteOfflineForm error', error);
  }
}

function* deleteOutboxForm({payload}) {
  try {
    const {draftId, status} = payload;
    yield database.deleteOutboxById({draftId: draftId});

    if (status === 'all') {
      yield put({type: FORM_SAGA_ACTIONS.LOAD_OUTBOX});
      return;
    }

    yield loadOutboxByStatus(status);
  } catch (error) {
    yield Alert.alert('', 'Error in deleting the outbox form');
    console.log('deleteOutboxForm error', error);
  }
}

function* offlineFormSync() {
  try {
    // if there is no internet
    const {isInternetReachable} = yield select(selectNetworkInfo);
    if (!isInternetReachable) {
      Alert.alert('', 'Unable to sync form. No current internet');
      return;
    }

    const offlineForms = yield select(selectOfflineFormList);
    const formCount = R.length(offlineForms);
    const offlineFormsCopy = R.clone(offlineForms);

    if (!formCount) {
      Alert.alert('', 'No offline forms to be synced.');
      return;
    }

    showActivityIndicator('Syncing offline forms');

    yield database.deleteAllForms();
    yield delay(3000);
    yield all(
      offlineFormsCopy.map((form) => {
        return syncOfflineForm({
          payload: {
            linkedTable: form.linkedtable,
            formId: form.id,
            multiple: true,
          },
        });
      }),
    );

    yield put({type: FORM_SAGA_ACTIONS.LOAD_OFFLINE_FORM});
    dismissActivityIndicator();
  } catch (error) {
    console.log('ERROR', error);
    dismissActivityIndicator();
  }
}

export default all([
  takeLatest(FORM_SAGA_ACTIONS.WATCH_FORM_UPDATES, watchFormsTemplatesUpdates),
  takeLatest(FORM_ACTION.UPDATE_FORM_FIELD_VALUE, updateFormFieldValue),
  takeLatest(
    FORM_ACTION.UPDATE_OFFLINE_FORM_FIELD_VALUE,
    updateOfflineFormFieldValue,
  ),
  takeLatest(FORM_ACTION.PRE_SUBMIT_FORM, preSubmitForm),
  takeLatest(FORM_ACTION.SYNC_OFFLINE_FORM, syncOfflineForm),
  takeLatest(FORM_SAGA_ACTIONS.LOAD_OFFLINE_FORM, loadOfflineForms),
  takeLatest(FORM_SAGA_ACTIONS.LOAD_OUTBOX, loadOutbox),
  takeLatest(FORM_SAGA_ACTIONS.LOAD_OUTBOX_BY_STATUS, loadOutboxByStatus),
  takeLatest(FORM_ACTION.SAVE_AS_DRAFT, saveAsDraft),
  takeLatest(FORM_ACTION.DELETE_OFFLINE_FORM, deleteOfflineForm),
  takeLatest(FORM_ACTION.DELETE_OUTBOX_FORM, deleteOutboxForm),
  takeLatest(FORM_ACTION.OFFLINE_FORM_SYNC, offlineFormSync),
]);
