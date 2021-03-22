//library
import React from 'react';
import {connect} from 'react-redux';
import {View, FlatList, Text, TouchableOpacity} from 'react-native';
import {createStructuredSelector} from 'reselect';
// import HTML from 'react-native-render-html';
import {Icon} from 'react-native-elements';
import Markdown from 'react-native-markdown-display';

import {selectNews} from '@selector/common';
import {limitText} from '@util/string';
import {updateFormList} from '@store/forms';
import {selectOrganistationPath} from '@selector/sanspaper';
import styles from './styles';
import {red} from '@styles/colors';
import {fetchOrgNews, fetchUserDetails, getUpviseTemplateForms} from './helper';

class MainScreen extends React.Component {
  state = {
    refresh: false,
    updatedNews: [],
    showMore: [],
  };

  componentDidMount() {
    this.initNews();
  }

  keyExtractor = (item, index) => index.toString();

  initNews = () => {
    const {updatedNews} = this.props;
    const toShowMore = updatedNews.map((news) => {
      if (news.hasOwnProperty('announcement')) {
        return false;
      }

      return true;
    });

    this.setState({updatedNews: [...updatedNews], showMore: [...toShowMore]});
  };

  wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  fetchNews = async () => {
    const orgNews = await fetchOrgNews(this.props.orgPath);
    const toShowMore = orgNews.map((news) => {
      if (news.hasOwnProperty('announcement')) {
        return false;
      }

      return true;
    });
    this.setState({updatedNews: [...orgNews], showMore: [...toShowMore]});
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

  runShowMore = (index) => {
    const showMore = [...this.state.showMore];
    showMore[index] = !showMore[index];
    this.setState({showMore: showMore});
  };

  renderMarkdown = ({item, index}) => {
    return (
      <>
        <View style={styles.newsContainer}>
          {/* {index === 0 ? (
            <View style={styles.latestNews}>
              <Text style={styles.newsText}>Latest announcement</Text>
            </View>
          ) : null} */}
          <Markdown style={styles}>
            {!this.state.showMore[index]
              ? limitText(item.announcement, 170)
              : item.announcement}
          </Markdown>
          <TouchableOpacity
            style={styles.showMoreBtn}
            onPress={() => {
              this.runShowMore(index);
            }}>
            <Text style={styles.showMoreText}>
              {this.state.showMore[index] ? 'Show less' : 'Show more'}
            </Text>
          </TouchableOpacity>
        </View>
      </>
    );
  };

  render() {
    const {updatedNews, refresh} = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Top News for Today</Text>
          {/* TODO: add search functionality
          <Icon name="search" type="font-awesome" /> */}
        </View>
        <FlatList
          showsVerticalScrollIndicator={false}
          keyExtractor={this.keyExtractor}
          data={updatedNews}
          renderItem={this.renderMarkdown}
          onRefresh={this.onRefresh}
          refreshing={refresh}
          extraData={this.state}
        />
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
    visible: false,
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
