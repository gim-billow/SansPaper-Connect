//library
import React from 'react';
import {View, ActivityIndicator} from 'react-native';

//styles
import styles from './styles';

class ActivityIndicatorOverlay extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="white" />
      </View>
    );
  }
}

export default ActivityIndicatorOverlay;
