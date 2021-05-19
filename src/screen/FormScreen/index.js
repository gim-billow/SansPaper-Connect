//library
import React from 'react';
import {View} from 'react-native';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';

import styles from './styles';
import {red} from '@styles/colors';
import FormList from '@containers/FormList/index';
import {selectNetworkInfo} from '@selector/common';
import NoInternet from '@containers/NoInternet';

class FormScreen extends React.Component {
  static options = () => {
    const option = {
      topBar: {
        visible: false,
        title: {
          text: 'Forms',
        },
      },
      statusBar: {
        visible: true,
        backgroundColor: red,
        styles: 'light',
      },
    };
    return option;
  };

  render() {
    const {netInfo} = this.props;

    return (
      <View style={styles.container}>
        {netInfo.isInternetReachable ? <FormList /> : <NoInternet />}
      </View>
    );
  }
}

const mapState = createStructuredSelector({
  netInfo: selectNetworkInfo,
});

export default connect(mapState, null)(FormScreen);
