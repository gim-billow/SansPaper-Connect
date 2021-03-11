//library
import React from 'react';
import {View, ActivityIndicator} from 'react-native';
import styles from './styles';
import ProfileList from '@containers/ProfileList/index';
import Profile from '../../components/Profile';

class ProfileScreen extends React.Component {
  static options = () => {
    const option = {
      topBar: {
        visible: false,
        title: {
          text: 'Profile',
        },
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
