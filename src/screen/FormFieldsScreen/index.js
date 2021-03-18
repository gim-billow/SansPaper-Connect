//library
import React from 'react';
import {View} from 'react-native';
import {find, propEq} from 'ramda';

import styles from './styles';
import {white, red} from '@styles/colors';
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
  let subForm = {};
  const {name, linkedid} = props.form;

  if (linkedid) {
    const items = props.items;
    let linkedId = null;

    if (Array.isArray(linkedid)) {
      linkedId = linkedid[0];
    } else {
      linkedId = linkedid;
    }

    subForm = find(propEq('id', linkedId))(items);
  }

  return {
    topBar: {
      visible: true,
      title: {
        text: name,
      },
      subtitle: {
        text: subForm.hasOwnProperty('name') ? subForm.name : '',
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
    statusBar: {
      visible: true,
      backgroundColor: red,
      styles: 'light',
    },
  };
};

export default FormFieldsScreen;
