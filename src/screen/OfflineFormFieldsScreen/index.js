//library
import React from 'react';
import {View} from 'react-native';
import {find, propEq} from 'ramda';

import styles from './styles';
import {white, red} from '@styles/colors';
import OfflineFormFieldsList from '@containers/OfflineFormFieldsList';
import {screens} from '@constant/ScreenConstants';

/**
 * This is used in the form lists
 */
class OfflineFormFieldsScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <OfflineFormFieldsList />
      </View>
    );
  }
}

OfflineFormFieldsScreen.options = (props) => {
  let rightBtn = [];
  const {title, subTitle} = props.headerData;
  const draftId = props.draftId;
  const outbox = props.outboxList;

  const selectedDraft = find(propEq('id', draftId))(outbox);
  if (selectedDraft.status === 'draft') {
    rightBtn.push({
      id: screens.RightButton,
      component: {
        name: screens.RightButton,
        passProps: {
          offline: true,
        },
      },
    });
  }

  return {
    topBar: {
      visible: true,
      title: {
        text: title,
      },
      subtitle: {
        text: subTitle,
        fontSize: 13,
        color: white,
      },
      backButton: {
        showTitle: false,
      },
      rightButtons: rightBtn,
    },
    statusBar: {
      visible: true,
      backgroundColor: red,
      styles: 'light',
    },
  };
};

export default OfflineFormFieldsScreen;
