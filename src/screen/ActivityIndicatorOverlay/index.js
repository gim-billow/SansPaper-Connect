//library
import React from 'react';
import {View, ActivityIndicator} from 'react-native';
import {Navigation} from 'react-native-navigation';

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

  componentDidMount() {
    this.navigationEventListener = Navigation.events().bindComponent(this);
  }

  componentWillUnmount() {
    // Unregistering listeners bound to components isn't mandatory since RNN handles the unregistration for you
    if (this.navigationEventListener) {
      this.navigationEventListener.remove();
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="white" />
      </View>
    );
  }
}

export default ActivityIndicatorOverlay;
