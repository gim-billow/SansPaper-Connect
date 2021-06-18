//library
import React from 'react';
import {View} from 'react-native';
import styles from './styles';
import Profile from '../../components/Profile';
import {red} from '@styles/colors';

class ProfileScreen extends React.Component {
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
    return (
      <View style={styles.container}>
        <Profile />
      </View>
    );
  }
}

export default ProfileScreen;
