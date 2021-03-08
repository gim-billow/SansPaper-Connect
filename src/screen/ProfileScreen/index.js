//library
import React from 'react';
import {View, ActivityIndicator} from 'react-native';
import styles from './styles';
import ProfileList from '@containers/ProfileList/index';

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
        <ProfileList />
      </View>
    );
  }
}

export default ProfileScreen;
