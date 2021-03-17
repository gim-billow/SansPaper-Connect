//library
import React from 'react';
import {connect} from 'react-redux';
import {View, Text} from 'react-native';
import {createStructuredSelector} from 'reselect';
import HTML from 'react-native-render-html';
import {map} from 'ramda';

import styles from './styles';
import {commonStyles} from '@styles/common';
import {selectNews} from '@selector/common';

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
    const {updatedNews} = this.props;
    const news = updatedNews.length ? updatedNews[0] : '';

    return (
      <View style={styles.container}>
        {/<\/?[a-z][\s\S]*>/i.test(news.announcement) ? (
          map(
            (content) => <HTML key={content} html={content} />,
            news.announcement,
          )
        ) : (
          <Text style={commonStyles.text}>{news.announcement}</Text>
        )}
      </View>
    );
  }
}

const mapState = createStructuredSelector({
  updatedNews: selectNews,
});

export default connect(mapState, {})(MainScreen);
