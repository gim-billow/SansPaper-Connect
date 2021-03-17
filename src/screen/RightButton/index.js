import React from 'react';
import {filter, has} from 'ramda';
import {TouchableOpacity, Alert} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Icon} from 'react-native-elements';
import {Navigation} from 'react-native-navigation';
import {screens} from '@constant/ScreenConstants';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
//redux,selector
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
      'Please complete all mandatory fields before submitting.',
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
