//library
import React from 'react';
import {connect} from 'react-redux';
import analytics from '@react-native-firebase/analytics';
import {NavigationComponent, Navigation} from 'react-native-navigation';
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
  Platform,
} from 'react-native';
import {createStructuredSelector} from 'reselect';
import Markdown from 'react-native-markdown-display';
import VersionCheck from 'react-native-version-check';
import InAppReview from 'react-native-in-app-review';
import {Divider, SearchBar, Button} from 'react-native-elements';
import memoize from 'memoize-one';
import R from 'ramda';

// push remote and local notifications, fcm
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';

import {limitText} from '@util/string';
import {updateFormList} from '@store/forms';
import {selectOrganistationPath} from '@selector/sanspaper';
import {selectSortedNews} from '@selector/common';
import {selectBokAccess, selectBetaAccess} from '@selector/user';
import styles from './styles';
import {veryLightGrey} from '@styles/colors';
import {searchBarStyle, subscriptionStyle} from '@styles/common';
import {hasAppReview, setAppReview} from '@api/user';
import {requestFeatureSubscription} from '@store/user';

const {width} = Dimensions.get('screen');

let fcmListener = null;

class MainScreen extends NavigationComponent {
  state = {
    showMore: [],
    searchKeyword: '',
  };

  componentDidMount() {
    // force update if new version is available
    this.checkVersion();
    this.appReview();
    this.requestNotifPermission();
  }

  componentDidAppear() {
    Navigation.events().registerComponentDidAppearListener(
      async ({componentName, componentType}) => {
        if (componentType === 'Component') {
          await analytics().logScreenView({
            screen_name: componentName,
            screen_class: componentName,
          });
        }
      },
    );
  }

  componentWillUnmount() {
    fcmListener && fcmListener();
  }

  async requestNotifPermission() {
    try {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        messaging()
          .getToken()
          .then((token) => console.log('FCM Token:', token));

        messaging()
          .subscribeToTopic('sansPaperConnectConfig')
          .then(() => console.log('Subscribed to topic'));

        fcmListener = messaging().onMessage(async (remoteMsg) => {
          const title = remoteMsg.notification.title;
          const message = remoteMsg.notification.body;

          if (Platform.OS === 'android') {
            PushNotification.localNotification({
              title,
              message,
            });
          } else {
            PushNotificationIOS.presentLocalNotification({
              alertTitle: title,
              alertBody: message,
            });
          }
        });
      }
    } catch (error) {
      console.log('Authorization error:', error);
    }
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

  keyExtractor = (item, index) => index?.toString();

  runShowMore = (index) => {
    const showMore = [...this.state.showMore];
    showMore[index] = !showMore[index];
    this.setState({showMore: showMore});
  };

  renderMarkdown = ({item, index}) => {
    return (
      <>
        <View style={styles.markDownView}>
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
        <Divider style={{marginHorizontal: 30}} />
      </>
    );
  };

  getFilteredNews = memoize((news, searchKeyword) => {
    return R.filter(
      (item) =>
        R.includes(
          searchKeyword?.toLowerCase(),
          item?.announcement?.toLowerCase(),
        ),
      news,
    );
  });

  handleOnChangeText = (text) => {
    this.setState({searchKeyword: text});
  };

  render() {
    const {searchKeyword} = this.state;
    const {
      updatedNews,
      betaAccess,
      bokAccess,
      requestFeatureSubscription,
    } = this.props;
    const filteredNews = this.getFilteredNews(updatedNews, searchKeyword);

    if (!updatedNews.length) {
      return (
        <View style={styles.container}>
          <View style={styles.header}>
            <SearchBar
              placeholder="Search keywords"
              containerStyle={searchBarStyle.searchContainer}
              inputContainerStyle={searchBarStyle.searchInputContainer}
              inputStyle={searchBarStyle.searchInput}
              searchIcon={{
                color: veryLightGrey,
              }}
              selectionColor={veryLightGrey}
              placeholderTextColor={veryLightGrey}
              value={searchKeyword}
              onChangeText={this.handleOnChangeText}
              clearIcon={{
                color: veryLightGrey,
              }}
            />
          </View>
          {/* <View style={styles.noItemsContainer}> */}
          {!betaAccess && !bokAccess ? (
            <View style={subscriptionStyle.subscriptionContainer}>
              <Image
                source={require('../../assets/subscribe.png')}
                resizeMode="contain"
                style={{width: width, height: width / 2}}
              />
              <Button
                type="outline"
                title="Subscribe"
                titleStyle={subscriptionStyle.subscribeText}
                buttonStyle={subscriptionStyle.subscribeBtn}
                onPress={() => requestFeatureSubscription('Body of Knowledge')}
              />
              <Text style={subscriptionStyle.subscriptionBottomText}>
                Email us to unlock the body of knowledge feature.
              </Text>
            </View>
          ) : (
            <View style={subscriptionStyle.subscriptionContainer}>
              <Image
                source={require('../../assets/empty-page.png')}
                resizeMode="contain"
                style={{width: width, height: width / 2}}
              />
              <Text style={subscriptionStyle.subscriptionBottomText}>
                No current items listed at the moment.
              </Text>
            </View>
          )}
          {/* </View> */}
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <SearchBar
            placeholder="Search keywords"
            containerStyle={searchBarStyle.searchContainer}
            inputContainerStyle={searchBarStyle.searchInputContainer}
            inputStyle={searchBarStyle.searchInput}
            searchIcon={{
              color: veryLightGrey,
            }}
            selectionColor={veryLightGrey}
            placeholderTextColor={veryLightGrey}
            value={searchKeyword}
            onChangeText={this.handleOnChangeText}
            clearIcon={{
              color: veryLightGrey,
            }}
          />
        </View>
        {!betaAccess && !bokAccess ? (
          <View style={subscriptionStyle.subscriptionContainer}>
            <Image
              source={require('../../assets/subscribe.png')}
              resizeMode="contain"
              style={{width: width, height: width / 2}}
            />
            <Button
              type="outline"
              title="Subscribe"
              titleStyle={subscriptionStyle.subscribeText}
              buttonStyle={subscriptionStyle.subscribeBtn}
              onPress={() => requestFeatureSubscription('Body of Knowledge')}
            />
            <Text style={subscriptionStyle.subscriptionBottomText}>
              Email us to unlock the body of knowledge feature.
            </Text>
          </View>
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            keyExtractor={this.keyExtractor}
            data={filteredNews}
            renderItem={this.renderMarkdown}
            extraData={this.state}
          />
        )}
      </View>
    );
  }
}

const mapState = createStructuredSelector({
  bokAccess: selectBokAccess,
  betaAccess: selectBetaAccess,
  updatedNews: selectSortedNews,
  orgPath: selectOrganistationPath,
});

export default connect(mapState, {updateFormList, requestFeatureSubscription})(
  MainScreen,
);
