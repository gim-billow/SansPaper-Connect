import * as React from 'react';
import {TextInput} from 'react-native-paper';
import {Text} from 'react-native';
import styles from './styles';

const User = (props) => {
  const {item} = props;
  console.log('profileText', props);
  return <Text style={styles.text}>User: {item.userName}</Text>;
};

export default User;
