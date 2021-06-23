//library
import React from 'react';
import {View} from 'react-native';
import {find, propEq, findIndex} from 'ramda';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {connectActionSheet} from '@expo/react-native-action-sheet';
import FAIcon from 'react-native-vector-icons/FontAwesome';

import styles from './styles';
import {white, red} from '@styles/colors';
import {commonStyles} from '@styles/common';
import OfflineFormFieldsList from '@containers/OfflineFormFieldsList';
import {screens} from '@constant/ScreenConstants';
import {selectNetworkInfo, selectActiveScreen} from '@selector/common';
import {activeScreen} from '@store/common';
import {
  selectIsSubmittingForm,
  selectSubmittingForm,
  selectIsDraftForm,
  selectOfflineFormList,
  selectOfflineCurrentForm,
  selectOfflineCurrentFormId,
} from 'selector/form';
import {submitForm, saveAsDraft, syncOfflineForm} from '@store/forms';

const setIcon = (name) => <FAIcon key={name} name={name} size={20} />;

/**
 * This is used in the form lists
 */
class OfflineFormFieldsScreen extends React.Component {
  componentDidUpdate(prevProps) {
    if (
      prevProps.onScreen !== this.props.onScreen &&
      (this.props.onScreen === 'offline' || this.props.onScreen === 'outbox')
    ) {
      this._onOpenActionSheet();
    }
  }

  componentWillUnmount() {
    this.props.activeScreen('');
  }

  _onOpenActionSheet = () => {
    const {
      offlineFormId,
      submitForm,
      saveAsDraft,
      isDraftForm,
      netInfo,
      offlineForms,
      syncOfflineForm,
      offlineCurrentForm,
    } = this.props;
    // check if the current form is already synced offline
    const offlineFormIndex = findIndex(propEq('id', offlineFormId))(
      offlineForms,
    );
    const options = netInfo.isInternetReachable
      ? [
          'Submit',
          isDraftForm ? 'Update draft' : 'Save as draft',
          isDraftForm ? 'Update pending' : 'Save as pending',
          'Cancel',
        ]
      : [
          isDraftForm ? 'Update draft' : 'Save as draft',
          isDraftForm ? 'Update pending' : 'Save as pending',
          'Cancel',
        ];
    const cancelButtonIndex = netInfo.isInternetReachable ? 3 : 2;
    const icons = netInfo.isInternetReachable
      ? [setIcon('send'), setIcon('save'), setIcon('spinner'), setIcon('times')]
      : [setIcon('save'), setIcon('spinner'), setIcon('times')];

    this.props.showActionSheetWithOptions(
      {
        options,
        icons,
        cancelButtonIndex,
        textStyle: {...commonStyles.actionSheetAndroid},
      },
      (buttonIndex) => {
        switch (buttonIndex) {
          case 0:
            // since submit button is hidden, it will run the saveAsDraft
            if (!netInfo.isInternetReachable) {
              saveAsDraft({
                offline: true,
                status: 'draft',
              });
              return;
            }
            submitForm(true);
            break;
          case 1:
            // if not internet, just do nothing
            if (!netInfo.isInternetReachable) {
              saveAsDraft({
                offline: true,
                status: 'pending',
              });
              break;
            }
            // download first b4 submitting the form
            if (offlineFormIndex === -1 && offlineFormId !== '') {
              syncOfflineForm({
                linkedTable: offlineCurrentForm.linkedtable,
                formId: offlineCurrentForm.id,
                dlFirst: true,
              });
              return;
            }
            saveAsDraft({
              offline: true,
              status: buttonIndex === 0 ? 'submitted' : 'draft',
            });
            break;
          case 2:
            // if not internet, just do nothing
            if (!netInfo.isInternetReachable) {
              this.props.activeScreen('');
              return;
            }
            saveAsDraft({
              offline: true,
              status: 'pending',
            });
            break;
          case 3:
            this.props.activeScreen('');
            break;
          default:
            break;
        }
      },
    );
  };

  render() {
    const screen = this.props.screen;

    return (
      <View style={styles.container}>
        <OfflineFormFieldsList screen={screen} />
      </View>
    );
  }
}

OfflineFormFieldsScreen.options = (props) => {
  let rightBtn = [];
  const {title, subTitle} = props.headerData;
  const draftId = props.draftId;
  const outbox = props.outboxList;
  const screen = props.screen;

  if (screen === 'offline') {
    rightBtn.push({
      id: screens.RightButton,
      component: {
        name: screens.RightButton,
        passProps: {
          // offline: true,
          screen,
        },
      },
    });
  } else if (screen === 'outbox') {
    const selectedDraft = find(propEq('id', draftId))(outbox);
    if (selectedDraft.status !== 'submitted') {
      rightBtn.push({
        id: screens.RightButton,
        component: {
          name: screens.RightButton,
          passProps: {
            // offline: true,
            screen,
          },
        },
      });
    }
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
    bottomTabs: {
      visible: false,
    },
  };
};

const mapState = createStructuredSelector({
  isSubmittingForm: selectIsSubmittingForm,
  submittingForm: selectSubmittingForm,
  isDraftForm: selectIsDraftForm,
  offlineForms: selectOfflineFormList,
  offlineFormId: selectOfflineCurrentFormId,
  offlineCurrentForm: selectOfflineCurrentForm,
  netInfo: selectNetworkInfo,
  onScreen: selectActiveScreen,
});

export default connect(mapState, {
  submitForm,
  saveAsDraft,
  syncOfflineForm,
  activeScreen,
})(connectActionSheet(OfflineFormFieldsScreen));
