import React from 'react';
import styles from './styles';
import {View, Text} from 'react-native';

class MultiSelect extends React.Component {
  state = {
    selectedItems: [],
    selectedItemObjects: [],
    queryOptionsMode: false,
    queryOptions: [],
    options: [],
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Multi</Text>
      </View>
    );
  }
}

export default MultiSelect;
