import * as React from 'react';

import {Text, View} from 'react-native';
import styles from './styles';

const Header = (props) => {
  const {label} = props.item;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{label}</Text>
    </View>
  );
};

export default Header;
