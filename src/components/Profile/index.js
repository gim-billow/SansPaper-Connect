import React, {Component} from 'react';
import {
  Text,
  View,
  Alert,
  Linking,
  ActivityIndicator,
  Platform,
} from 'react-native';
import styles from './styles';

import {getReadableVersion} from 'react-native-device-info';

import {List} from 'react-native-paper';
import {Divider, Image} from 'react-native-elements';

// svg icon
import MailIcon from './SvgIcon/MailIcon';
import LogoutIcon from './SvgIcon/LogoutIcon';
import UpdatedIcon from './SvgIcon/UpdatedIcon';
import PrivacyPolicyIcon from './SvgIcon/PrivacyPolicyIcon';
import {darkGrey, red} from '@styles/colors';

class Profile extends Component {
  state = {
    selected: '',
    visible: false,
  };

  showModal = () =>
    this.setState({
      visible: true,
    });

  hideModal = () =>
    this.setState({
      visible: false,
    });

  onDropItemChange = (value) => {
    this.setState({
      selected: value,
    });
  };

  showNoInternetAlert = () =>
    Alert.alert('', 'No internet available. Logout once internet is back');

  onPressLogoutHandler = () => {
    const {
      networkInfo,
      logoutUser,
      removeAllDownloadForms,
      betaAccess,
      offlineFeature,
    } = this.props;

    let message = '';

    if (!betaAccess && !offlineFeature) {
      message = 'Are you sure you want to logout?';
    } else {
      message =
        'Are you sure with this action? Logging out will clear all the stored forms data from your phone for offline usage.';
    }

    Alert.alert(
      'Logout',
      message,
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Logout',
          onPress: async () => {
            if (!networkInfo.isInternetReachable) {
              this.showNoInternetAlert();
              return;
            }

            if (offlineFeature || betaAccess) {
              removeAllDownloadForms();
            }

            logoutUser();
          },
          style: 'destructive',
        },
      ],
      {cancelable: false},
    );
  };

  render() {
    const {
      email,
      user,
      organization,
      openActionSheet,
      profilePicture,
      loadingImg,
    } = this.props;
    const name = user?._data?.name;

    return (
      <>
        <View style={styles.container}>
          <View style={styles.top}>
            {loadingImg ? (
              <View style={styles.loader}>
                <ActivityIndicator style={styles.activityLoader} color="#fff" />
              </View>
            ) : null}
            {profilePicture ? (
              <Image
                source={{uri: profilePicture}}
                resizeMethod="resize"
                onPress={openActionSheet}
                style={styles.profileImg}
              />
            ) : (
              <Image
                source={require('../../assets/user.png')}
                resizeMode="contain"
                resizeMethod="auto"
                onPress={openActionSheet}
                style={styles.profileLogo}
              />
            )}
            <View style={styles.topHeader}>
              <Text style={styles.name}>{name}</Text>
              <Text style={styles.subText}>{organization.name}</Text>
            </View>
          </View>

          {/* email */}
          <View style={styles.listContainer}>
            <List.Item
              style={styles.list}
              titleStyle={styles.title}
              title="Email"
              descriptionStyle={styles.description}
              description={email}
              left={() => (
                <View style={styles.listIcon}>
                  <MailIcon width={30} height={40} color={darkGrey} />
                </View>
              )}
            />
            <Divider />
          </View>

          {/* update */}
          <View style={styles.listContainer}>
            <List.Item
              style={styles.list}
              titleStyle={styles.title}
              title="Update"
              description={() => (
                <>
                  <Text style={styles.updateText}>Updated</Text>
                  <Text
                    style={
                      styles.updateVersion
                    }>{`Current Version : ${getReadableVersion()}`}</Text>
                </>
              )}
              descriptionStyle={styles.updateText}
              left={() => (
                <View style={styles.listIcon}>
                  <UpdatedIcon width={30} height={40} color={darkGrey} />
                </View>
              )}
            />
            <Divider />
          </View>

          {/* Privacy Policy */}
          <View style={styles.listContainer}>
            <List.Item
              onPress={() =>
                Linking.openURL('https://sanspaper.com/privacy-policy/')
              }
              style={styles.list}
              titleStyle={styles.title}
              title="Privacy Policy"
              left={() => (
                <View style={styles.listIcon}>
                  <PrivacyPolicyIcon width={30} height={40} color={darkGrey} />
                </View>
              )}
            />
            <Divider />
          </View>

          {/* logout */}
          <View style={styles.listContainer}>
            <List.Item
              onPress={this.onPressLogoutHandler}
              style={styles.list}
              titleStyle={styles.title}
              title="Logout"
              left={() => (
                <View style={styles.listIcon}>
                  <LogoutIcon width={30} height={40} color={red} />
                </View>
              )}
            />
          </View>
        </View>
      </>
    );
  }
}

export default Profile;
