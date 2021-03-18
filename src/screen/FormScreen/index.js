//library
import React from 'react';
import {View} from 'react-native';

import styles from './styles';
import {red} from '@styles/colors';
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
        <FormList />
      </View>
    );
  }
}

export default FormScreen;
