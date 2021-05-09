import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Icon} from 'react-native-elements';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';

import {
  selectIsSubmittingForm,
  selectSubmittingForm,
} from 'selector/form';

import {submitForm} from '@store/forms';
import styles from './styles';

class RightButton extends React.Component {
  render() {
    const {offline, submitForm, submittingForm} = this.props;
    console.log('this.props',this.props);
    return (
      <TouchableOpacity
        disabled={submittingForm}
        onPress={() => submitForm(offline)}>
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
})(RightButton);
