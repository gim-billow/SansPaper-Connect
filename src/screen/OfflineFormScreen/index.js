//library
import React from 'react';
import {View} from 'react-native';

import styles from './styles';
import {red} from '@styles/colors';
import OfflineFormList from '@containers/OfflineFormList';

class OfflineFormScreen extends React.Component {
  static options = () => {
    const option = {
      topBar: {
        visible: false,
        title: {
          text: 'Offline Forms',
        },
      },
      statusBar: {
        visible: true,
        backgroundColor: red,
        styles: 'light',
      },
    };
    return option;
  };

  render() {
    return (
      <View style={styles.container}>
        <OfflineFormList />
      </View>
    );
  }
}

export default OfflineFormScreen;
