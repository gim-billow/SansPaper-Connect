import {Alert, Platform, PermissionsAndroid} from 'react-native';
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
import {assoc, adjust, forEach} from 'ramda';
import {eventChannel} from 'redux-saga';
import Geolocation from 'react-native-geolocation-service';
import moment from 'moment';

import AlertMessages from '@constant/AlertMessages';
import {getUpviseTemplate} from '@api/forms';
import {submitUpviseForm} from '@api/upvise';

import {screens} from '@constant/ScreenConstants';
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
} from '@selector/form';
import {showActivityIndicator, dismissActivityIndicator} from 'navigation';

async function hasLocationPermission() {
  // console.log("hasLocatoinPermission called");
  if (
    Platform.OS === 'ios' ||
    (Platform.OS === 'android' && Platform.Version < 23)
  ) {
    // console.log("setting location permission to true");
    return true;
  }

  const hasPermission = await PermissionsAndroid.check(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  );

  if (hasPermission) {
    console.log('user has permission', hasPermission);
    return true;
  }

  const status = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  );

  if (status === PermissionsAndroid.RESULTS.GRANTED) {
    console.log('checking status of permission android', status);
    return true;
  }

  if (status === PermissionsAndroid.RESULTS.DENIED) {
    Alert.alert(
      'Warning',
      'Geo Location permission not granted, geolocation will not be attached to form',
      [{text: 'OK', onPress: () => console.log('OK Pressed')}],
      {cancelable: false},
    );

    return false;
  } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
    Alert.alert(
      'Warning',
      "Geo Location is set to 'Never Ask Again', geolocation will never be attached to forms",
      [{text: 'OK', onPress: () => console.log('OK Pressed')}],
      {cancelable: false},
    );

    return false;
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

async function submitForm(form) {
  try {
    showActivityIndicator();
    const permission = await hasLocationPermission();

    if (permission) {
      Geolocation.getCurrentPosition(
        async (position) => {
          // console.log("checking position", position);
          form.geo =
            '' + position.coords.latitude + ',' + position.coords.longitude;
          let isSubmitted = await submitUpviseForm(form);

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
    showActivityIndicator();
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
      forEach(({startDateTime, finishDateTime}) => {
        const hours = moment
          .duration(finishDateTime - startDateTime, 'milliseconds')
          .asHours();
        console.log('hours = ', hours);
        // alert if finish date time is greater than start date time
        if (
          startDateTime &&
          finishDateTime &&
          finishDateTime - startDateTime <= 0
        ) {
          dateTimeError = 'dateTimeError';
        } else if (hours >= 20) {
          dateTimeError = 'hoursExceededError';
        }
      }, startAndFinishDateTime);

      if (dateTimeError === 'dateTimeError') {
        dismissActivityIndicator();
        yield Alert.alert('Alert', dateTimeErrorMessage, alertConfig, {
          cancelable: false,
        });
      } else if (dateTimeError === 'hoursExceededError') {
        dismissActivityIndicator();
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
        yield submitForm(form);
      }
    }

    dismissActivityIndicator();
    yield put(updateSubmittingForm(false));
  } catch (error) {
    console.log('submitForm error', error);
  }
}

export default all([
  takeLatest(FORM_SAGA_ACTIONS.WATCH_FORM_UPDATES, watchFormsTemplatesUpdates),
  takeLatest(FORM_ACTION.UPDATE_FORM_FIELD_VALUE, updateFormFieldValue),
  takeLatest(FORM_ACTION.PRE_SUBMIT_FORM, preSubmitForm),
]);
