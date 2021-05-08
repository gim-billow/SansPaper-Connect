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
} from 'redux-saga/effects';
import {Navigation} from 'react-native-navigation';
import {firebase} from '@react-native-firebase/firestore';
import {assoc, adjust, forEach, includes} from 'ramda';
import {eventChannel} from 'redux-saga';
import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoding';
import moment from 'moment';

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
  selectStartAndFinishDate,
  selectCurrentFormId,
  selectFormByCurrentId,
  selectOfflineCurrentForm,
} from '@selector/form';
import {
  selectOrganistation,
  selectUpviseTemplatePath,
} from '@selector/sanspaper';
import {showActivityIndicator, dismissActivityIndicator} from 'navigation';
import {selectType, projectDependant} from './contants';
import * as database from '@database';

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

function* updateOfflineFormFieldValue({payload}) {
  try {
    const {rank, value} = payload;
    const currentForm = yield select(selectOfflineCurrentForm);
    const updatedForm = adjust(
      rank - 1,
      (i) => assoc('value', value, i),
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

async function submitForm(form) {
  try {
    showActivityIndicator();
    const permission = await hasLocationPermission();
    if (permission) {
      Geolocation.getCurrentPosition(
        async (position) => {
          const geo =
            '' + position.coords.latitude + ',' + position.coords.longitude;
          let updatedForm = assoc('geo', geo, form);

          const addr = await Geocoder.from([
            position.coords.latitude,
            position.coords.longitude,
          ]);

          updatedForm = assoc(
            'address',
            addr.results[0].formatted_address,
            updatedForm,
          );

          let isSubmitted = await submitUpviseForm(updatedForm);

          if (isSubmitted) {
            dismissActivityIndicator();
            Navigation.popToRoot(screens.FormScreen);
            Alert.alert('Alert', 'Form submitted');
          } else {
            dismissActivityIndicator();
            Alert.alert('Alert', 'Form not submitted');
          }
        },
        (error) => {
          dismissActivityIndicator();
          Alert.alert(
            'Alert',
            'Unable to retrieve your current location, please check if GPS is turn on and try again, form not submitted',
          );
          console.log('Geo Location not attached', error.code, error.message);
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 15000},
      );
    } else {
      dismissActivityIndicator();
      Alert.alert('Alert', 'Location Permission Error: Form not submitted');
    }
  } catch (error) {
    dismissActivityIndicator();
    Alert.alert('Alert', 'Error submitting form, please contact support');
  }
}

function* preSubmitForm({payload}) {
  try {
    yield showActivityIndicator();
    yield put(updateSubmittingForm(true));
    const alertConfig = [
      {
        text: 'Ok',
        style: 'cancel',
      },
    ];
    const form = payload;
    const unfilledMandatoryFields = yield select(
      selectCurrentFormUnfillMandatoryFields,
    );
    const startAndFinishDateTime = yield select(selectStartAndFinishDate);
    let dateTimeError = '';
    const {
      mandatoryError,
      dateTimeErrorMessage,
      hoursExceededError,
    } = AlertMessages;

    // check if there is an empty value in a mandatory field
    if (unfilledMandatoryFields.length > 0) {
      const {rank} = unfilledMandatoryFields[0];
      const scrollToIndex = rank === 1 ? rank : rank - 1;
      yield put(updateSubmitTriggered());
      yield put(updateScrollToMandatory(scrollToIndex));

      yield Alert.alert('Alert', mandatoryError, alertConfig, {
        cancelable: false,
      });
    } else {
      let scrollToIndex = null;
      forEach(({startDateTime, finishDateTime, rank}) => {
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
        yield Alert.alert('Alert', dateTimeErrorMessage, alertConfig, {
          cancelable: false,
        });
      } else if (dateTimeError === 'hoursExceededError') {
        dismissActivityIndicator();
        yield put(updateSubmitTriggered());
        yield put(updateScrollToMandatory(scrollToIndex));
        yield Alert.alert(
          'Alert',
          hoursExceededError,
          [
            {
              text: 'No',
              style: 'cancel',
            },
            {
              text: 'Yes',
              onPress: async () => {
                await submitForm(form);
              },
            },
          ],
          {cancelable: false},
        );
      } else {
        dismissActivityIndicator();
        yield submitForm(form);
        yield put(updateSubmittingForm(false));
        return;
      }
    }

    dismissActivityIndicator();
    yield put(updateSubmittingForm(false));
  } catch (error) {
    console.log('submitForm error', error);
  }
}

function* syncOfflineForm({payload = {}}) {
  try {
    showActivityIndicator();
    const {linkedTable, formId} = payload;
    const dateNow = new Date();
    const upviseTemplatePath = yield select(selectUpviseTemplatePath);
    const organisation = yield select(selectOrganistation);
    const currentFormInfo = yield select(selectFormByCurrentId);
    const fieldsPath = `${upviseTemplatePath}/${formId}/upviseFields`;

    //sync forms
    const currentFormFields = yield getFormFields({fieldsPath});
    const currentForm = assoc('fields', currentFormFields, currentFormInfo);
    const currentFormPayload = {
      id: formId,
      createdAt: dateNow.toISOString(),
      updatedAt: dateNow.toISOString(),
      value: JSON.stringify(currentForm),
    };
    yield database.InsertForm(currentFormPayload);
    //sync linked item
    console.log('payload', payload);
    if (linkedTable && linkedTable !== '') {
      const linkedItemName =
        UpviseTablesMap[payload?.linkedTable.toLowerCase()];
      const linkedItems = yield queryUpviseTable({
        table: linkedItemName,
        organisation,
      });

      if (linkedItems?.data) {
        const {title, lastBuildDate, items} = linkedItems?.data;
        console.log('items', items);
        const payload = {
          id: title,
          createdAt: lastBuildDate,
          updatedAt: lastBuildDate,
          value: JSON.stringify(items),
        };
        yield database.InsertLinkedItems(payload);
      }
    }

    //sync forms fields
    let projectList = [];
    for (const field of currentFormFields) {
      const {seloptions, type} = field;
      if (includes(type, selectType)) {
        let isProjectDependant = false;
        for (const project of projectDependant) {
          if (includes(project, seloptions)) {
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
    dismissActivityIndicator();
    //console.log('linkedItem', JSON.stringify(linkedItem));
  } catch (error) {
    dismissActivityIndicator();
    console.log('error', error);
  }
}

function* loadFormFields({payload = {}}) {
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
  takeLatest(
    FORM_ACTION.UPDATE_OFFLINE_FORM_FIELD_VALUE,
    updateOfflineFormFieldValue,
  ),
  takeLatest(FORM_ACTION.PRE_SUBMIT_FORM, preSubmitForm),
  takeLatest(FORM_ACTION.SYNC_OFFLINE_FORM, syncOfflineForm),
]);
