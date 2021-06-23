import * as React from 'react';
import {View} from 'react-native';
import Outbox from '@containers/Outbox';
import styles from './styles';

const OfflineFormScreen = () => {
  return (
    <View style={styles.container}>
      <Outbox />
    </View>
  );
};

export default OfflineFormScreen;
