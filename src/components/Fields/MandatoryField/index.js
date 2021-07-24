import React from 'react';
import {Text, View} from 'react-native';
import {Icon} from 'react-native-elements';
import {darkRed} from '@styles/colors';

import styles from './styles';
import {Platform} from 'react-native';

const MandatoryField = () => {
  return (
    <View style={styles.topContainer}>
      {Platform.OS === 'android' ? (
        <Icon
          name="pushpin"
          color={darkRed}
          size={10}
          type="ant-design"
          style={styles.icon}
        />
      ) : (
        <Icon
          name="push-pin"
          color={darkRed}
          size={12}
          style={[styles.icon, {transform: [{rotate: '310deg'}]}]}
        />
      )}
      <Text style={styles.text}>This is a mandatory field</Text>
    </View>
  );
};

export default MandatoryField;
