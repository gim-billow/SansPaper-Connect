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
import {selectCurrentForm} from 'selector/form';
// upvise api
import {submitUpviseForm} from '../../api/upvise';
import {Platform} from 'react-native';

class RightButton extends React.Component {
  state = {
    submitting: false,
  };

  submit = async (form) => {
    console.log('forms here', form.fields);

    let startDateTime = null;
    let finishDateTime = null;

    showActivityIndicator();
    const requiredFields = filter(
      (field) => field.mandatory === 1,
      form.fields,
    );
    // check if there is an empty value in a mandatory field
    const proceed = requiredFields.map((field) => {
      if (!field.value) {
        return false;
      }

      return true;
    });

    if (proceed.includes(false)) {
      dismissActivityIndicator();
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

  renderAlert = (type = 'mandatoryError') => {
    let message = 'Please complete all mandatory fields before submitting.';

    if (type === 'datetimeError') {
      message = 'Finish date and time has to be after Start date and time.';
    }

    return Alert.alert(
      'Alert',
      message,
      [
        {
          text: 'OK',
          onPress: () => {
            this.setState({submitting: false});
          },
          style: 'cancel',
        },
      ],
      {cancelable: false},
    );
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
});

export default connect(mapState, {setCurrentForm})(RightButton);
