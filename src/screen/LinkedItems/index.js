import React from 'react';
import {Text, View} from 'react-native';

import LinkedItemsList from '@containers/LinkedItemsList';
import styles from './styles';
import {red} from '@styles/colors';

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
      statusBar: {
        visible: true,
        backgroundColor: red,
        styles: 'light',
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
