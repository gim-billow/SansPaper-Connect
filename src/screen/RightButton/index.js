import React from 'react';
import {filter, forEach} from 'ramda';
import {TouchableOpacity, Alert, View} from 'react-native';
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
  selectStartAndFinishDate,
  selectCurrentFormUnfillMandatoryFields,
} from 'selector/form';
// upvise api
import {submitUpviseForm} from '../../api/upvise';
import {
  updateScrollToMandatory,
  updateSubmitTriggered,
} from '../../store/forms/actions';
import AlertMessages from './constant';
import styles from './styles';

class RightButton extends React.Component {
  state = {
    submitting: false,
  };

  submit = async (form) => {
    const {
      unfilledMandatoryFields,
      updateScrollToMandatory,
      startAndFinishDateTime,
      updateSubmitTriggered,
    } = this.props;

    let dateTimeError = '';
    let dateTimeErrorIndex = null;

    showActivityIndicator();

    // check if there is an empty value in a mandatory field
    if (unfilledMandatoryFields.length > 0) {
      const {rank} = unfilledMandatoryFields[0];
      const scrollToIndex = rank === 1 ? rank : rank - 1;
      dismissActivityIndicator();
      updateSubmitTriggered();
      updateScrollToMandatory(scrollToIndex);
      this.renderAlert('mandatoryError');
      return;
    }

    forEach(({startDateTime, finishDateTime, rank}) => {
      // alert if finish date time is greater than start date time
      if (
        startDateTime &&
        finishDateTime &&
        finishDateTime - startDateTime <= 0
      ) {
        dateTimeError = 'datetimeError';
        if (!dateTimeErrorIndex) {
          dateTimeErrorIndex = rank === 1 ? rank : rank - 1;
          updateScrollToMandatory(dateTimeErrorIndex);
        }
      } else if ((finishDateTime - startDateTime) / 60 / 60 / 1000 >= 20) {
        dateTimeError = 'hoursExceededError';
        if (!dateTimeErrorIndex) {
          dateTimeErrorIndex = rank === 1 ? rank : rank - 1;
          updateScrollToMandatory(dateTimeErrorIndex);
        }
      }
    }, startAndFinishDateTime);

    if (dateTimeError === 'datetimeError') {
      dismissActivityIndicator();
      this.renderAlert('datetimeError');
      return;
    } else if (dateTimeError === 'hoursExceededError') {
      dismissActivityIndicator();
      this.renderAlert('hoursExceededError', form);
      return;
    } else {
      this.onSubmit(form);
    }
  };

  renderAlert = (type = 'default', form = null) => {
    let message = AlertMessages[type];

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
          style={styles.icon}
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
  startAndFinishDateTime: selectStartAndFinishDate,
  unfilledMandatoryFields: selectCurrentFormUnfillMandatoryFields,
});

export default connect(mapState, {
  setCurrentForm,
  updateScrollToMandatory,
  updateSubmitTriggered,
})(RightButton);
