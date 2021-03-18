//library
import React from 'react';
import {connect} from 'react-redux';
import {View, Text, RefreshControl, ScrollView} from 'react-native';
import {createStructuredSelector} from 'reselect';
import HTML from 'react-native-render-html';
import {map} from 'ramda';

import {selectNews} from '@selector/common';
import {updateFormList} from '@store/forms';
import {selectOrganistationPath} from '@selector/sanspaper';
import styles from './styles';
import {commonStyles} from '@styles/common';
import {red} from '@styles/colors';
import {fetchOrgNews, fetchUserDetails, getUpviseTemplateForms} from './helper';

class MainScreen extends React.Component {
  state = {
    refresh: false,
    updatedNews: [],
  };

  componentDidMount() {
    this.initNews();
  }

  initNews = () => {
    const {updatedNews} = this.props;
    this.setState({updatedNews: [...updatedNews]});
  };

  wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  fetchNews = async () => {
    const orgNews = await fetchOrgNews(this.props.orgPath);
    this.setState({updatedNews: [...orgNews]});
  };

  fetchUpdatedTemplates = async () => {
    const {updateFormList: dispatchFormList} = this.props;
    const forms = await getUpviseTemplateForms(this.props.orgPath);

    dispatchFormList(forms);
  };

  onRefresh = async () => {
    this.setState({refresh: true});

    // fetch updated org news
    this.fetchNews();
    // FIXME: fetched user email
    fetchUserDetails();
    // get updated template forms
    this.fetchUpdatedTemplates();

    this.wait(2000).then(() => this.setState({refresh: false}));
  };

  render() {
    const {updatedNews} = this.state;
    const news = updatedNews.length ? updatedNews[0] : '';

    return (
      <View style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollView}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refresh}
              onRefresh={this.onRefresh}
            />
          }>
          {/<\/?[a-z][\s\S]*>/i.test(news.announcement) ? (
            map(
              (content) => <HTML key={content} html={content} />,
              news.announcement,
            )
          ) : (
            <Text style={commonStyles.text}>{news.announcement}</Text>
          )}
        </ScrollView>
      </View>
    );
  }
}

const mapState = createStructuredSelector({
  updatedNews: selectNews,
  orgPath: selectOrganistationPath,
});

MainScreen.options = {
  topBar: {
    visible: true,
    title: {
      text: 'News',
    },
  },
  statusBar: {
    visible: true,
    backgroundColor: red,
    styles: 'light',
  },
};

export default connect(mapState, {updateFormList})(MainScreen);
