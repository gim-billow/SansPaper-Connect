//library
import React from 'react';
import {View} from 'react-native';
import styles from './styles';
import FormFieldsList from '@containers/FormFieldsList';
import {screens} from '@constant/ScreenConstants';
import Ionicons from 'react-native-vector-icons/Ionicons';

/**
 * This is used in the form lists
 */
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
        rightButtons: [
          {
            id: screens.RightButton,
            component: {
              name: screens.RightButton,
            },
          },
        ],
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
