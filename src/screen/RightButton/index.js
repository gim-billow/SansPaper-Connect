import React from 'react';
import {TouchableOpacity, Alert} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Navigation} from 'react-native-navigation';
import {screens} from '@constant/ScreenConstants';

class RightButton extends React.Component {
  submit = () => {
    Navigation.popTo(screens.FormScreen);
    Alert.alert('Alert', 'Form Submitted');
    console.log('submit button', this.props);
  };
  render() {
    return (
      <TouchableOpacity onPress={this.submit} style={{paddingRight: 10}}>
        <Ionicons name="paper-plane" size={25} color="white" />
      </TouchableOpacity>
    );
  }
}

export default RightButton;
