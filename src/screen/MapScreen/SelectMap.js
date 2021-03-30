import React from 'react';
import {TouchableOpacity, StyleSheet, Platform} from 'react-native';
import {Icon} from 'react-native-elements';
import {Navigation} from 'react-native-navigation';

import {screens} from '@constant/ScreenConstants';

class SelectMap extends React.Component {
  state = {
    submitting: false,
  };

  render() {
    return (
      <TouchableOpacity
        onPress={() => {
          Navigation.pop(screens.MapScreen);
        }}>
        <Icon
          style={styles.icon}
          name="check"
          type="font-awesome"
          color="#fff"
        />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  icon: {
    paddingRight: Platform.OS === 'android' ? 20 : 0,
  },
});

export default SelectMap;
