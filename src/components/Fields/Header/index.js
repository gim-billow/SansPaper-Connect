import React from 'react';

import {Text, View} from 'react-native';
import {Divider} from 'react-native-elements';
import styles from './styles';

const Header = (props) => {
  const {label} = props.item;

  if (!label) {
    return <View />;
  }

  return (
    <View style={styles.container}>
      <Divider style={styles.divider} />
      <View style={styles.textView}>
        <Text style={styles.text}>{label}</Text>
      </View>
      <Divider style={styles.divider} />
    </View>
  );
};

export default Header;
