//library
import React from 'react';
import {View} from 'react-native';
import styles from './styles';
import FormFieldsList from '@containers/FormFieldsList';

class FormFieldsScreen extends React.Component {
  static options = () => {
    const option = {
      topBar: {
        visible: true,
        title: {
          text: 'Form',
        },
        backButton: {
          showTitle: false,
        },
      },
    };
    return option;
  };

  render() {
    return (
      <View style={styles.container}>
        <FormFieldsList />
      </View>
    );
  }
}

export default FormFieldsScreen;
