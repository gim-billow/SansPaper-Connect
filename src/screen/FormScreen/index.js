//library
import React from 'react';
import {View, ActivityIndicator} from 'react-native';
import styles from './styles';
import FormList from '@containers/FormList/index';

class FormScreen extends React.Component {
  static options = () => {
    const option = {
      topBar: {
        visible: false,
        title: {
          text: 'Forms',
        },
      },
    };
    return option;
  };

  render() {
    return (
      <View style={styles.container}>
        <FormList />
      </View>
    );
  }
}

export default FormScreen;
