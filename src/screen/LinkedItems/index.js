import React from 'react';
import {Text, View} from 'react-native';

import LinkedItemsList from '@containers/LinkedItemsList';
import styles from './styles';

class LinkedItems extends React.Component {
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
    };
    return option;
  };

  render() {
    const {linkedItemName} = this.props;
    return linkedItemName ? (
      <View style={styles.container}>
        <LinkedItemsList />
      </View>
    ) : (
      <View>
        <Text>form</Text>
      </View>
    );
  }
}

export default LinkedItems;
