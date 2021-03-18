//library
import React from 'react';
import {View} from 'react-native';
import styles from './styles';
import Profile from '../../components/Profile';
import {red} from '@styles/colors';

class ProfileScreen extends React.Component {
  static options = () => {
    const option = {
      topBar: {
        visible: false,
        title: {
          text: 'Profile',
        },
      },
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
