import React from 'react';
// import {connectActionSheet} from '@expo/react-native-action-sheet';
import {TouchableOpacity, View, Platform} from 'react-native';
import {connect} from 'react-redux';
// import {findIndex, propEq} from 'ramda';
import {createStructuredSelector} from 'reselect';
import {Icon} from 'react-native-elements';

import {
  // selectIsSubmittingForm,
  selectSubmittingForm,
  // selectIsDraftForm,
  // selectOfflineFormList,
  // selectCurrentFormId,
  // selectCurrentForm,
  // selectOfflineCurrentForm,
  // selectOfflineCurrentFormId,
} from 'selector/form';
// import {selectNetworkInfo} from '@selector/common';
// import {submitForm, saveAsDraft, syncOfflineForm} from '@store/forms';
import {activeScreen} from '@store/common';
import styles from './styles';

class RightButton extends React.Component {
  handlePress = () => {
    this.props.activeScreen('RightButton');
  };

  // handleOnPressIOS = () => {
  //   const {
  //     formId,
  //     offline,
  //     submitForm,
  //     saveAsDraft,
  //     isDraftForm,
  //     netInfo,
  //     offlineForms,
  //     syncOfflineForm,
  //     currentForm,
  //   } = this.props;
  //   // check if the current form is already synced offline
  //   const offlineFormIndex = findIndex(propEq('id', formId))(offlineForms);
  //   const options = netInfo.isInternetReachable
  //     ? ['Submit', isDraftForm ? 'Update draft' : 'Save as draft', 'Cancel']
  //     : [isDraftForm ? 'Update draft' : 'Save as draft', 'Cancel'];
  //   const cancelButtonIndex = netInfo.isInternetReachable ? 2 : 1;
  //   this.props.showActionSheetWithOptions(
  //     {
  //       options,
  //       cancelButtonIndex,
  //     },
  //     (buttonIndex) => {
  //       switch (buttonIndex) {
  //         case 0:
  //           // since submit button is hidden, it will run the saveAsDraft
  //           if (!netInfo.isInternetReachable) {
  //             // download first b4 submitting the form
  //             if (offlineFormIndex === -1 && formId !== '') {
  //               syncOfflineForm({
  //                 linkedTable: currentForm.linkedtable,
  //                 formId: currentForm.id,
  //                 dlFirst: true,
  //               });
  //             } else {
  //               saveAsDraft({
  //                 offline,
  //                 status: 'draft',
  //               });
  //             }
  //             return;
  //           }
  //           submitForm(offline);
  //           break;
  //         case 1:
  //           // if not internet, just do nothing
  //           if (!netInfo.isInternetReachable) {
  //             return;
  //           }
  //           // download first b4 submitting the form
  //           if (offlineFormIndex === -1 && formId !== '') {
  //             syncOfflineForm({
  //               linkedTable: currentForm.linkedtable,
  //               formId: currentForm.id,
  //               dlFirst: true,
  //             });
  //             return;
  //           }
  //           saveAsDraft({
  //             offline,
  //             status: buttonIndex === 0 ? 'submitted' : 'draft',
  //           });
  //           break;
  //         default:
  //           break;
  //       }
  //     },
  //   );
  // };

  render() {
    const {submittingForm} = this.props;

    return (
      <View>
        <TouchableOpacity disabled={submittingForm} onPress={this.handlePress}>
          <Icon
            style={styles.icon}
            name="paper-plane"
            type="font-awesome"
            color="#fff"
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const mapState = createStructuredSelector({
  // isSubmittingForm: selectIsSubmittingForm,
  submittingForm: selectSubmittingForm,
  // netInfo: selectNetworkInfo,
  // isDraftForm: selectIsDraftForm,
  // offlineForms: selectOfflineFormList,
  // formId: selectCurrentFormId,
  // offlineFormId: selectOfflineCurrentFormId,
  // currentForm: selectCurrentForm,
  // offlineCurrentForm: selectOfflineCurrentForm,
});

export default connect(mapState, {
  // submitForm,
  // saveAsDraft,
  // syncOfflineForm,
  activeScreen,
})(RightButton);
