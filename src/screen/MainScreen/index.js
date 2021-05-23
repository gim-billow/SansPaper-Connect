//library
import React from 'react';
import {connect} from 'react-redux';
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  Alert,
  BackHandler,
  Linking,
  Image,
  Dimensions,
} from 'react-native';
import {createStructuredSelector} from 'reselect';
import Markdown from 'react-native-markdown-display';
import VersionCheck from 'react-native-version-check';
import InAppReview from 'react-native-in-app-review';

import {limitText} from '@util/string';
import {updateFormList} from '@store/forms';
import {selectOrganistationPath} from '@selector/sanspaper';
import {selectSortedNews} from '@selector/common';
import styles from './styles';
import {red} from '@styles/colors';
import {hasAppReview, setAppReview} from '@api/user';

const {width} = Dimensions.get('screen');
class MainScreen extends React.Component {
  state = {
    showMore: [],
  };

  componentDidMount() {
    // force update if new version is available
    this.checkVersion();

    this.appReview();
  }

  async appReview() {
    const hasReviewed = await hasAppReview();
    if (InAppReview.isAvailable() && !hasReviewed) {
      const hasFlowFinishedSuccessfully = await InAppReview.RequestInAppReview();

      if (hasFlowFinishedSuccessfully) {
        setAppReview(true);
      }
    }
  }

  async checkVersion() {
    try {
      let updateNeeded = await VersionCheck.needUpdate();
      if (updateNeeded && updateNeeded.isNeeded) {
        this.forceUpdateAlert(updateNeeded.storeUrl);
      }
    } catch (error) {
      console.error('error on updating app', error);
    }
  }

  forceUpdateAlert(url) {
    return Alert.alert(
      'Please Update',
      'You need to upgrade to the latest version.',
      [
        {
          text: 'Update Now',
          onPress: () => {
            BackHandler.exitApp();
            Linking.openURL(url);
          },
          style: 'cancel',
        },
      ],
      {cancelable: false},
    );
  }

  keyExtractor = (item, index) => index.toString();

  runShowMore = (index) => {
    const showMore = [...this.state.showMore];
    showMore[index] = !showMore[index];
    this.setState({showMore: showMore});
  };

  renderMarkdown = ({item, index}) => {
    return (
      <>
        <View style={styles.newsContainer}>
          <Markdown style={styles}>
            {!this.state.showMore[index]
              ? limitText(item.announcement, 170)
              : item.announcement}
          </Markdown>
          {item.announcement.length > 170 ? (
            <TouchableOpacity
              style={styles.showMoreBtn}
              onPress={() => {
                this.runShowMore(index);
              }}>
              <Text style={styles.showMoreText}>
                {this.state.showMore[index] ? 'Show less' : 'Show more'}
              </Text>
            </TouchableOpacity>
          ) : null}
        </View>
      </>
    );
  };

  render() {
    const {updatedNews} = this.props;

    if (!updatedNews.length) {
      return (
        <View style={styles.noItemsContainer}>
          <Image
            source={require('../../assets/no-items.jpeg')}
            resizeMode="contain"
            style={{width: width - 50}}
          />
        </View>
      );
    }

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
          extraData={this.state}
        />
      </View>
    );
  }
}

const mapState = createStructuredSelector({
  updatedNews: selectSortedNews,
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
