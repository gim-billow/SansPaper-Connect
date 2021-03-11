import React from 'react';
import {filter, has} from 'ramda';
import {TouchableOpacity, Alert} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Navigation} from 'react-native-navigation';
import {screens} from '@constant/ScreenConstants';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
//redux,selector
import {setCurrentForm} from 'store/forms';
import {selectCurrentForm} from 'selector/form';
// upvise api
import {submitUpviseForm} from '../../api/upvise';

class RightButton extends React.Component {
  state = {
    submitting: false,
  };

  submit = async (form) => {
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
      this.renderMandatoryAlert();
      return;
    }

    console.log('form', form);

    let isSubmitted = await submitUpviseForm(form);

    if (isSubmitted) {
      Navigation.popTo(screens.FormScreen);
      this.setState({submitting: false});
      Alert.alert('Alert', 'Form submitted');
    } else {
      this.setState({submitting: false});
      Alert.alert('Alert', 'Form not submitted');
    }
  };

  renderMandatoryAlert = () =>
    Alert.alert(
      'Alert',
      'Please complete all mandatory forms before submitting',
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
        <Ionicons name="paper-plane" size={25} color="white" />
      </TouchableOpacity>
    );
  }
}

const mapState = createStructuredSelector({
  currentForm: selectCurrentForm,
});

export default connect(mapState, {setCurrentForm})(RightButton);
