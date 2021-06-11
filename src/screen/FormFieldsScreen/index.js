//library
import React from 'react';
import {View} from 'react-native';
import {find, propEq, findIndex} from 'ramda';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {connectActionSheet} from '@expo/react-native-action-sheet';

import styles from './styles';
import {white, red} from '@styles/colors';
import FormFieldsList from '@containers/FormFieldsList';
import {screens} from '@constant/ScreenConstants';
import {selectNetworkInfo, selectActiveScreen} from '@selector/common';
import {activeScreen} from '@store/common';
import {
  selectIsSubmittingForm,
  selectSubmittingForm,
  selectIsDraftForm,
  selectOfflineFormList,
  selectCurrentFormId,
  selectCurrentForm,
  selectOfflineCurrentForm,
  selectOfflineCurrentFormId,
} from 'selector/form';
import {submitForm, saveAsDraft, syncOfflineForm} from '@store/forms';
// import NoInternet from '@containers/NoInternet';

/**
 * This is used in the form lists
 */
class FormFieldsScreen extends React.Component {
  componentDidUpdate(prevProps) {
    if (
      prevProps.onScreen !== this.props.onScreen &&
      this.props.onScreen === 'RightButton'
    ) {
      this._onOpenActionSheet();
    }
  }

  componentWillUnmount() {
    this.props.activeScreen('');
  }

  _onOpenActionSheet = () => {
    const {
      formId,
      offline,
      submitForm,
      saveAsDraft,
      isDraftForm,
      netInfo,
      offlineForms,
      syncOfflineForm,
      currentForm,
    } = this.props;
    // check if the current form is already synced offline
    const offlineFormIndex = findIndex(propEq('id', formId))(offlineForms);
    const options = netInfo.isInternetReachable
      ? ['Submit', isDraftForm ? 'Update draft' : 'Save as draft', 'Cancel']
      : [isDraftForm ? 'Update draft' : 'Save as draft', 'Cancel'];
    const cancelButtonIndex = netInfo.isInternetReachable ? 2 : 1;

    this.props.showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      (buttonIndex) => {
        switch (buttonIndex) {
          case 0:
            // since submit button is hidden, it will run the saveAsDraft
            if (!netInfo.isInternetReachable) {
              // download first b4 submitting the form
              if (offlineFormIndex === -1 && formId !== '') {
                syncOfflineForm({
                  linkedTable: currentForm.linkedtable,
                  formId: currentForm.id,
                  dlFirst: true,
                });
              } else {
                saveAsDraft({
                  offline,
                  status: 'draft',
                });
              }
              return;
            }
            submitForm(offline);
            break;
          case 1:
            // if not internet, just do nothing
            if (!netInfo.isInternetReachable) {
              this.props.activeScreen('');
              return;
            }
            // download first b4 submitting the form
            if (offlineFormIndex === -1 && formId !== '') {
              syncOfflineForm({
                linkedTable: currentForm.linkedtable,
                formId: currentForm.id,
                dlFirst: true,
              });
              return;
            }
            saveAsDraft({
              offline,
              status: buttonIndex === 0 ? 'submitted' : 'draft',
            });
            break;
          case 2:
            this.props.activeScreen('');
            break;
          default:
            break;
        }
      },
    );
  };

  render() {
    // const {netInfo} = this.props;
    return (
      <View style={styles.container}>
        <FormFieldsList />
        {/* {netInfo.isInternetReachable ? <FormFieldsList /> : <NoInternet />} */}
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
  isSubmittingForm: selectIsSubmittingForm,
  submittingForm: selectSubmittingForm,
  isDraftForm: selectIsDraftForm,
  offlineForms: selectOfflineFormList,
  formId: selectCurrentFormId,
  offlineFormId: selectOfflineCurrentFormId,
  currentForm: selectCurrentForm,
  offlineCurrentForm: selectOfflineCurrentForm,
  netInfo: selectNetworkInfo,
  onScreen: selectActiveScreen,
});

export default connect(mapState, {
  submitForm,
  saveAsDraft,
  syncOfflineForm,
  activeScreen,
})(connectActionSheet(FormFieldsScreen));
