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
  selectCurrentFormUnfillMandatoryFields,
} from 'selector/form';

import {
  updateScrollToMandatory,
  updateSubmitTriggered,
  submitForm,
} from '@store/forms/actions';
import styles from './styles';

class RightButton extends React.Component {
  state = {
    submitting: false,
  };

  render() {
    const {currentForm, submitForm} = this.props;

    return (
      <TouchableOpacity onPress={() => submitForm(currentForm)}>
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
  startAndFinishDateTime: selectStartAndFinishDate,
  unfilledMandatoryFields: selectCurrentFormUnfillMandatoryFields,
});

export default connect(mapState, {
  setCurrentForm,
  updateScrollToMandatory,
  updateSubmitTriggered,
  submitForm,
})(RightButton);
