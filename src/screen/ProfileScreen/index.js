//library
import React from 'react';
import {View} from 'react-native';
import styles from './styles';
import Profile from '../../components/Profile';

class ProfileScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Profile />
      </View>
    );
  }
}

export default ProfileScreen;
