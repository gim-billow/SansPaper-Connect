import React from 'react';
import {filter} from 'ramda';
import {TouchableOpacity, Alert} from 'react-native';
import {Icon} from 'react-native-elements';
import {Navigation} from 'react-native-navigation';
import {screens} from '@constant/ScreenConstants';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
//redux,selector
import {showActivityIndicator, dismissActivityIndicator} from 'navigation';
import {setCurrentForm} from 'store/forms';
import {
  selectCurrentForm,
  selectCurrentFormUnfillMandatoryFields,
} from 'selector/form';
// upvise api
import {submitUpviseForm} from '../../api/upvise';
import {Platform} from 'react-native';
import {updateScrollToMandatory} from '../../store/forms/actions';

class RightButton extends React.Component {
  state = {
    submitting: false,
  };

  submit = async (form) => {
    let startDateTime = null;
    let finishDateTime = null;

    const {unfilledMandatoryFields, updateScrollToMandatory} = this.props;
    showActivityIndicator();

    // check if there is an empty value in a mandatory field
    if (unfilledMandatoryFields.length > 0) {
      dismissActivityIndicator();
      updateScrollToMandatory(unfilledMandatoryFields[0].rank);
      this.renderAlert();
      return;
    }

    // check start/finish date time
    for (let item of form.fields) {
      if (item.type === 'datetime') {
        if (item.label.toLowerCase().includes('start')) {
          startDateTime = item.value;
        }

        if (item.label.toLowerCase().includes('finish')) {
          finishDateTime = item.value;
        }
      }
    }

    // alert if finish date time is greater than start date time
    if (
      startDateTime &&
      finishDateTime &&
      finishDateTime - startDateTime <= 0
    ) {
      dismissActivityIndicator();
      this.renderAlert('datetimeError');
      return;
    }

    // if more than 20 hours
    if ((finishDateTime - startDateTime) / 60 / 60 / 1000 >= 20) {
      dismissActivityIndicator();
      this.renderAlert('hoursExceededError', form);
      return;
    }

    this.onSubmit(form);
  };

  renderAlert = (type = 'mandatoryError', form = null) => {
    let message = '';

    switch (type) {
      case 'mandatoryError':
        message = 'Please complete all mandatory fields before submitting.';
        break;
      case 'datetimeError':
        message = 'Finish date and time has to be after Start date and time.';
        break;
      case 'hoursExceededError':
        message =
          'Total time is more than 20 hrs, do you still wish to submit?';
        break;
      default:
        message = 'Something went wrong with submission';
        break;
    }

    return Alert.alert(
      'Alert',
      message,
      type === 'hoursExceededError'
        ? [
            {
              text: 'No',
              onPress: () => {
                this.setState({submitting: false});
              },
              style: 'cancel',
            },
            {
              text: 'Yes',
              onPress: () => {
                showActivityIndicator();
                this.onSubmit(form);
              },
            },
          ]
        : [
            {
              text: 'Ok',
              onPress: () => {
                this.setState({submitting: false});
              },
              style: 'cancel',
            },
          ],
      {cancelable: false},
    );
  };

  onSubmit = async (form) => {
    let isSubmitted = await submitUpviseForm(form);

    if (isSubmitted) {
      dismissActivityIndicator();
      Navigation.popToRoot(screens.FormScreen);
      this.setState({submitting: false});
      Alert.alert('Alert', 'Form submitted');
    } else {
      dismissActivityIndicator();
      this.setState({submitting: false});
      Alert.alert('Alert', 'Form not submitted');
    }
  };

  render() {
    const {currentForm} = this.props;

    return (
      <TouchableOpacity
        onPress={() => {
          if (!this.state.submitting) {
            this.submit(currentForm);
            this.setState({submitting: true});
          }
        }}>
        <Icon
          style={{
            marginRight: Platform.OS === 'android' ? 20 : 0,
          }}
          name="paper-plane"
          type="font-awesome"
          color="#fff"
        />
      </TouchableOpacity>
    );
  }
}

const mapState = createStructuredSelector({
  currentForm: selectCurrentForm,
  unfilledMandatoryFields: selectCurrentFormUnfillMandatoryFields,
});

export default connect(mapState, {setCurrentForm, updateScrollToMandatory})(RightButton);
