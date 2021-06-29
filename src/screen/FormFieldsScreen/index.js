//library
import React from 'react';
import {View} from 'react-native';
import {find, propEq, findIndex} from 'ramda';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {connectActionSheet} from '@expo/react-native-action-sheet';
import FAIcon from 'react-native-vector-icons/FontAwesome';

import styles from './styles';
import {white} from '@styles/colors';
import {commonStyles} from '@styles/common';
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
} from 'selector/form';
import {selectOfflineFeatureExpired} from '@selector/user';
import {submitForm, saveAsDraft, syncOfflineForm} from '@store/forms';
import {questrial} from '@styles/font';
// import NoInternet from '@containers/NoInternet';

const setIcon = (name) => <FAIcon key={name} name={name} size={20} />;

/**
 * This is used in the form lists
 */
class FormFieldsScreen extends React.Component {
  componentDidUpdate(prevProps) {
    if (
      prevProps.onScreen !== this.props.onScreen &&
      this.props.onScreen === 'online'
    ) {
      if (this.props.offlineFeatureExpired) {
        this._onlySubmitActionSheet();
        return;
      }
      this._onOpenActionSheet();
    }
  }

  componentWillUnmount() {
    this.props.activeScreen('');
  }

  _onlySubmitActionSheet = () => {
    const {submitForm} = this.props;
    const options = ['Submit', 'Cancel'];
    const cancelButtonIndex = 1;
    const icons = [setIcon('send'), setIcon('times')];

    this.props.showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        icons,
        textStyle: {...commonStyles.actionSheetAndroid},
      },
      (buttonIndex) => {
        switch (buttonIndex) {
          case 0:
            submitForm(false);
            break;
          default:
            break;
        }
      },
    );
  };

  _onOpenActionSheet = () => {
    const {
      formId,
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
              // download first b4 submitting the form
              if (offlineFormIndex === -1 && formId !== '') {
                syncOfflineForm({
                  linkedTable: currentForm.linkedtable,
                  formId: currentForm.id,
                  dlFirst: true,
                });
              } else {
                saveAsDraft({
                  offline: false,
                  status: 'draft',
                });
              }
              return;
            }
            submitForm(false);
            break;
          case 1:
            // if not internet, just do nothing
            if (!netInfo.isInternetReachable) {
              saveAsDraft({
                offline: false,
                status: 'pending',
              });
              break;
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
              offline: false,
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
              offline: false,
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
  const screen = props.screen;

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
        fontSize: 12,
        fontFamily: questrial,
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
              // offline: false,
              screen,
            },
          },
        },
      ],
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
  formId: selectCurrentFormId,
  currentForm: selectCurrentForm,
  netInfo: selectNetworkInfo,
  onScreen: selectActiveScreen,
  offlineFeatureExpired: selectOfflineFeatureExpired,
});

export default connect(mapState, {
  submitForm,
  saveAsDraft,
  syncOfflineForm,
  activeScreen,
})(connectActionSheet(FormFieldsScreen));
