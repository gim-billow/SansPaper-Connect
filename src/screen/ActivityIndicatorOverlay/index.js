//library
import React from 'react';
import {View, Text, ActivityIndicator} from 'react-native';

//styles
import styles from './styles';
import {red} from '@styles/colors';

class ActivityIndicatorOverlay extends React.Component {
  static options = () => {
    const option = {
      statusBar: {
        visible: true,
        backgroundColor: red,
        styles: 'light',
      },
    };
    return option;
  };

  render() {
    // const {messages} = this.props;

    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="white" />
        {/* {messages !== '' && (
          <View style={styles.messages}>
            <Text style={styles.text}>{messages}</Text>
          </View>
        )} */}
      </View>
    );
  }
}

export default ActivityIndicatorOverlay;
