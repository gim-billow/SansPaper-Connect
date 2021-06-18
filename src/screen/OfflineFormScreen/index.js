import * as React from 'react';
import {View} from 'react-native';
import {red} from '@styles/colors';
import Outbox from '@containers/Outbox';
import styles from './styles';

const OfflineFormScreen = () => {
  return (
    <View style={styles.container}>
      <Outbox />
    </View>
  );
};

OfflineFormScreen.options = {
  statusBar: {
    visible: true,
    backgroundColor: red,
    styles: 'light',
  },
};

export default OfflineFormScreen;
