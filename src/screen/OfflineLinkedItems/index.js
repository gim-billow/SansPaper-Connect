import React from 'react';
import {View} from 'react-native';

import OfflineLinkedItemsList from '@containers/OfflineLinkedItemsList';
import styles from './styles';

class OfflineLinkedItems extends React.Component {
  static options = () => {
    const option = {
      topBar: {
        title: {
          text: 'Select Subject',
        },
        backButton: {
          showTitle: false,
        },
      },
      bottomTabs: {
        visible: false,
      },
    };
    return option;
  };

  render() {
    return (
      <View style={styles.container}>
        <OfflineLinkedItemsList />
      </View>
    );
  }
}

export default OfflineLinkedItems;
