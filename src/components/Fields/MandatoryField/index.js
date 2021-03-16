import React from 'react';
import {Text, View} from 'react-native';
import styles from './styles';

const MandatoryField = () => {
  return (
    <View>
      <Text style={styles.text}>* This is a mandatory field</Text>
    </View>
  );
};

export default MandatoryField;
