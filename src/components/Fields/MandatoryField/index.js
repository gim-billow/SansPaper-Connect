import React from 'react';
import {Text, View} from 'react-native';
import styles from './styles';

const MandatoryField = () => {
  return (
    <View>
      <Text style={styles.text}>* This is a Mandatory Field</Text>
    </View>
  );
};

export default MandatoryField;
