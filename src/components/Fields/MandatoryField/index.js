import React from 'react';
import {Text, View} from 'react-native';
import {Icon} from 'react-native-elements';
import {darkRed} from '@styles/colors';

import styles from './styles';

const MandatoryField = () => {
  return (
    <View style={styles.topContainer}>
      <Icon
        name="push-pin"
        color={darkRed}
        size={12}
        style={[styles.icon, {transform: [{rotate: '310deg'}]}]}
      />
      <Text style={styles.text}>This is a mandatory field</Text>
    </View>
  );
};

export default MandatoryField;
