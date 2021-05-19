//library
import React from 'react';
import {View} from 'react-native';
import {find, propEq} from 'ramda';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';

import styles from './styles';
import {white, red} from '@styles/colors';
import FormFieldsList from '@containers/FormFieldsList';
import {screens} from '@constant/ScreenConstants';
import {selectNetworkInfo} from '@selector/common';
import NoInternet from '@containers/NoInternet';
/**
 * This is used in the form lists
 */
class FormFieldsScreen extends React.Component {
  render() {
    const {netInfo} = this.props;
    return (
      <View style={styles.container}>
        {netInfo.isInternetReachable ? <FormFieldsList /> : <NoInternet />}
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
            passProps: {
              offline: false,
            },
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

const mapState = createStructuredSelector({
  netInfo: selectNetworkInfo,
});

export default connect(mapState, null)(FormFieldsScreen);
