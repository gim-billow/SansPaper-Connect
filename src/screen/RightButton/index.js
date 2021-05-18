import React from 'react';
import {connectActionSheet} from '@expo/react-native-action-sheet';
import {TouchableOpacity} from 'react-native';
import {Icon} from 'react-native-elements';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';

import {selectIsSubmittingForm, selectSubmittingForm} from 'selector/form';

import {submitForm, saveAsDraft} from '@store/forms';
import styles from './styles';

class RightButton extends React.Component {
  handleOnPress = () => {
    const {offline, submitForm, saveAsDraft} = this.props;
    const options = ['Submit', 'Save as draft', 'Cancel'];
    const cancelButtonIndex = 2;
    this.props.showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      (buttonIndex) => {
        switch (buttonIndex) {
          case 0:
            submitForm(offline);
            break;
          case 1:
            saveAsDraft(offline);
            break;
          default:
            submitForm(offline);
            break;
        }
      },
    );
  };
  render() {
    const {submittingForm} = this.props;
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
});

export default connect(mapState, {
  submitForm,
  saveAsDraft,
})(connectActionSheet(RightButton));
