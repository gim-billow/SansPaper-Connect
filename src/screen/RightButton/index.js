import React from 'react';
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
    let isSubmitted = await submitUpviseForm(form);

    if (isSubmitted) {
      Navigation.popTo(screens.FormScreen);
      Alert.alert('Alert', 'Form submitted');
    } else {
      Alert.alert('Alert', 'Form not submitted');
    }

    this.setState({submitting: false});
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
        <Ionicons name="paper-plane" size={25} color="white" />
      </TouchableOpacity>
    );
  }
}

const mapState = createStructuredSelector({
  currentForm: selectCurrentForm,
});

export default connect(mapState, {setCurrentForm})(RightButton);
