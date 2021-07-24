//library
import React from 'react';
import {View, Alert} from 'react-native';
import {find, propEq, findIndex} from 'ramda';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {connectActionSheet} from '@expo/react-native-action-sheet';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import analytics from '@react-native-firebase/analytics';
import {NavigationComponent, Navigation} from 'react-native-navigation';

import styles from './styles';
import {white} from '@styles/colors';
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
  selectDraftFormHasChanges,
} from 'selector/form';
import {
  submitForm,
  saveAsDraft,
  syncOfflineForm,
  draftFormHasChanges,
} from '@store/forms';

const setIcon = (name) => <FAIcon key={name} name={name} size={20} />;

/**
 * This is used in the form lists
 */
class OfflineFormFieldsScreen extends NavigationComponent {
  componentDidMount() {
    Navigation.events().bindComponent(this);
  }

  componentDidAppear() {
    Navigation.events().registerComponentDidAppearListener(
      async ({componentName, componentType}) => {
        if (componentType === 'Component') {
          await analytics().logScreenView({
            screen_name: componentName,
            screen_class: componentName,
          });
        }
      },
    );

    if (this.props.draftId) {
      Navigation.mergeOptions(screens.OfflineFormFieldsScreen, {
        topBar: {
          backButton: {
            popStackOnPress: false,
            color: '#fff',
          },
        },
      });
    } else {
      Navigation.mergeOptions(screens.OfflineFormFieldsScreen, {
        topBar: {
          backButton: {
            popStackOnPress: true,
            color: '#fff',
          },
        },
      });
    }
  }

  onBackPressButton() {
    Alert.alert(
      '',
      'All changes will be lost, do you want to go back?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('cancel pressed'),
          style: 'cancel',
        },
        {
          text: 'Go Back',
          onPress: () => {
            Navigation.pop(screens.OfflineFormScreen);
            this.props.draftFormHasChanges(false);
          },
          style: 'destructive',
        },
      ],
      {
        cancelable: false,
      },
    );
  }

  navigationButtonPressed({buttonId}) {
    const {draftFromHasChanges} = this.props;

    if (buttonId === 'RNN.back') {
      if (this.props.draftId) {
        draftFromHasChanges
          ? this.onBackPressButton()
          : Navigation.pop(screens.OfflineFormScreen);
      }
    }
  }

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
      draftFormHasChanges,
    } = this.props;
    // check if the current form is already synced offline
    const offlineFormIndex = findIndex(propEq('id', offlineFormId))(
      offlineForms,
    );
    const options = netInfo.isInternetReachable
      ? [
          'Submit',
          isDraftForm ? 'Update draft' : 'Save as draft',
          /**
           * TODO: Will add back once background fetch functionality is added
           */
          // isDraftForm ? 'Update pending' : 'Save as pending',
          'Cancel',
        ]
      : [
          isDraftForm ? 'Update draft' : 'Save as draft',
          /**
           * TODO: Will add back once background fetch functionality is added
           */
          // isDraftForm ? 'Update pending' : 'Save as pending',
          'Cancel',
        ];
    const cancelButtonIndex = netInfo.isInternetReachable ? 2 : 1;
    const icons = netInfo.isInternetReachable
      ? // ? [setIcon('send'), setIcon('save'), setIcon('spinner'), setIcon('times')]
        [setIcon('send'), setIcon('save'), setIcon('times')]
      : // : [setIcon('save'), setIcon('spinner'), setIcon('times')];
        [setIcon('save'), setIcon('times')];

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
              draftFormHasChanges(false);
              return;
            }
            submitForm(true);
            draftFormHasChanges(false);
            break;
          case 1:
            // if not internet, just do nothing
            if (!netInfo.isInternetReachable) {
              this.props.activeScreen('');
              // saveAsDraft({
              //   offline: true,
              //   status: 'draft',
              // });
              return;
            }

            if (offlineFormIndex === -1 && offlineFormId !== '') {
              syncOfflineForm({
                linkedTable: offlineCurrentForm.linkedtable,
                formId: offlineCurrentForm.id,
                dlFirst: true,
              });
              draftFormHasChanges(false);
              return;
            }
            saveAsDraft({
              offline: true,
              status: buttonIndex === 0 ? 'submitted' : 'draft',
            });
            draftFormHasChanges(false);
            break;
          /**
           * TODO: Will add back once background fetch functionality is added
           */
          // case 2:
          //   // if not internet, just do nothing
          //   if (!netInfo.isInternetReachable) {
          //     this.props.activeScreen('');
          //     return;
          //   }
          //   saveAsDraft({
          //     offline: true,
          //     status: 'pending',
          //   });
          //   break;
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
    const {screen, draftFormHasChanges} = this.props;

    return (
      <View style={styles.container}>
        <OfflineFormFieldsList
          screen={screen}
          draftFormHasChanges={draftFormHasChanges}
        />
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
  draftFromHasChanges: selectDraftFormHasChanges,
});

export default connect(mapState, {
  submitForm,
  saveAsDraft,
  syncOfflineForm,
  activeScreen,
  draftFormHasChanges,
})(connectActionSheet(OfflineFormFieldsScreen));
