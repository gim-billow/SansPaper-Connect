import * as React from 'react';
import {TextInput} from 'react-native-paper';
import {Text} from 'react-native';
import styles from './styles';

const Level = (props) => {
  const {item} = props;
  console.log('profileText', props);
  return <Text style={styles.text}>: {item.points} points</Text>;
};

export default Level;
