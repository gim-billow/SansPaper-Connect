//library
import React from 'react';
import {View} from 'react-native';
import {find, propEq} from 'ramda';

import styles from './styles';
import {white} from '@styles/colors';
import FormFieldsList from '@containers/FormFieldsList';
import {screens} from '@constant/ScreenConstants';

/**
 * This is used in the form lists
 */
class FormFieldsScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <FormFieldsList />
      </View>
    );
  }
}

FormFieldsScreen.options = (props) => {
  const {name, linkedid} = props.form;
  const items = props.items;
  const subForm = find(propEq('id', linkedid[0]))(items);

  return {
    topBar: {
      visible: true,
      title: {
        text: name,
      },
      subtitle: {
        text: subForm.name,
        fontSize: 13,
        color: white,
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
};

export default FormFieldsScreen;
