import React from 'react';
import {connectActionSheet} from '@expo/react-native-action-sheet';
import {TouchableOpacity} from 'react-native';
import {Icon} from 'react-native-elements';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';

import {
  selectIsSubmittingForm,
  selectSubmittingForm,
  selectIsDraftForm,
} from 'selector/form';
import {selectNetworkInfo} from '@selector/common';

import {submitForm, saveAsDraft} from '@store/forms';
import styles from './styles';
import {Alert} from 'react-native';

class RightButton extends React.Component {
  handleOnPress = () => {
    const {offline, submitForm, saveAsDraft, isDraftForm, netInfo} = this.props;
    const options = [
      'Submit',
      isDraftForm ? 'Update draft' : 'Save as draft',
      'Cancel',
    ];
    const cancelButtonIndex = 2;

    this.props.showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      (buttonIndex) => {
        switch (buttonIndex) {
          case 0:
            if (!netInfo.isInternetReachable) {
              this.showNoInternetAlert(saveAsDraft, offline);
              return;
            }
            submitForm(offline);
            break;
          case 1:
            saveAsDraft({
              offline,
              status: buttonIndex === 0 ? 'submitted' : 'draft',
            });
            break;
          default:
            break;
        }
      },
    );
  };

  showNoInternetAlert = () => {
    const {offline, saveAsDraft, isDraftForm} = this.props;
    const message = isDraftForm
      ? 'update the draft?'
      : 'save the form as draft';

    return Alert.alert(
      'Alert',
      `Currently no internet. Do you want to ${message}`,
      [
        {
          text: isDraftForm ? 'Update' : 'Save',
          onPress: () => {
            saveAsDraft({
              offline,
              status: 'draft',
            });
          },
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ],
      {
        cancelable: false,
      },
    );
  };

  render() {
    const {submittingForm, netInfo} = this.props;

    return (
      <TouchableOpacity disabled={submittingForm} onPress={this.handleOnPress}>
        <Icon
          style={styles.icon}
          name="paper-plane"
          type="font-awesome"
          color="#fff"
        />
      </TouchableOpacity>
    );
  }
}

const mapState = createStructuredSelector({
  isSubmittingForm: selectIsSubmittingForm,
  submittingForm: selectSubmittingForm,
  netInfo: selectNetworkInfo,
  isDraftForm: selectIsDraftForm,
});

export default connect(mapState, {
  submitForm,
  saveAsDraft,
})(connectActionSheet(RightButton));
