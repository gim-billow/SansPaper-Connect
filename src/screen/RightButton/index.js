import React from 'react';
import {TouchableOpacity, View, Keyboard} from 'react-native';
import {connect} from 'react-redux';
// import {findIndex, propEq} from 'ramda';
import {createStructuredSelector} from 'reselect';
import {Icon} from 'react-native-elements';

import {selectSubmittingForm} from 'selector/form';
import {activeScreen} from '@store/common';
import styles from './styles';

class RightButton extends React.Component {
  handlePress = () => {
    Keyboard.dismiss();
    const screen = this.props.screen;
    this.props.activeScreen(screen);
  };

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
  submittingForm: selectSubmittingForm,
});

export default connect(mapState, {
  activeScreen,
})(RightButton);
