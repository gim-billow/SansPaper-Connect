//library
import React from 'react';
import {View, Text, ActivityIndicator} from 'react-native';
import {Navigation} from 'react-native-navigation';

//styles
import styles from './styles';
import {red} from '@styles/colors';

class ActivityIndicatorOverlay extends React.Component {
  componentDidMount() {
    Navigation.events().bindComponent(this);
  }

  render() {
    const {messages} = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.loaderView}>
          <ActivityIndicator size="large" color={red} />
          {messages !== '' ? (
            <View style={styles.messages}>
              <Text style={styles.text}>{messages}</Text>
            </View>
          ) : (
            <View style={styles.messages}>
              <Text style={styles.text}>Loading</Text>
            </View>
          )}
        </View>
      </View>
    );
  }
}

export default ActivityIndicatorOverlay;
