import React from 'react';
import {View} from 'react-native';

import OfflineLinkedItemsList from '@containers/OfflineLinkedItemsList';
import styles from './styles';
import {red} from '@styles/colors';

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
        <OfflineLinkedItemsList />
      </View>
    );
  }
}

export default OfflineLinkedItems;
