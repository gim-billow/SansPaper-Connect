import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Icon} from 'react-native-elements';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';

import {setCurrentForm} from 'store/forms';
import {
  selectCurrentForm,
  selectIsSubmittingForm,
  selectStartAndFinishDate,
  selectSubmittingForm,
  selectCurrentFormUnfillMandatoryFields,
} from 'selector/form';

import {
  updateScrollToMandatory,
  updateSubmitTriggered,
  submitForm,
} from '@store/forms/actions';
import styles from './styles';

class RightButton extends React.Component {
  render() {
    const {currentForm, submitForm, submittingForm} = this.props;

    return (
      <TouchableOpacity
        disabled={submittingForm}
        onPress={() => submitForm(currentForm)}>
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
  currentForm: selectCurrentForm,
  isSubmittingForm: selectIsSubmittingForm,
  submittingForm: selectSubmittingForm,
  startAndFinishDateTime: selectStartAndFinishDate,
  unfilledMandatoryFields: selectCurrentFormUnfillMandatoryFields,
});

export default connect(mapState, {
  setCurrentForm,
  updateScrollToMandatory,
  updateSubmitTriggered,
  submitForm,
})(RightButton);
