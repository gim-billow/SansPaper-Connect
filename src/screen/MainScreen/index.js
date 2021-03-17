//library
import React from 'react';
import {connect} from 'react-redux';
import {View} from 'react-native';
import {createStructuredSelector} from 'reselect';
import HTML from 'react-native-render-html';
import {map} from 'ramda';

import styles from './styles';
import {selectNews} from '../../selector/common';

class MainScreen extends React.Component {
  static options = () => {
    const option = {
      topBar: {
        visible: false,
        title: {
          text: 'News',
        },
      },
    };
    return option;
  };

  render() {
    const {htmlContent} = this.props;

    return (
      <View style={styles.container}>
        {map(
          (content) => (
            <HTML key={content} html={content} />
          ),
          htmlContent,
        )}
      </View>
    );
  }
}

const mapState = createStructuredSelector({
  htmlContent: selectNews,
});

export default connect(mapState, {})(MainScreen);
