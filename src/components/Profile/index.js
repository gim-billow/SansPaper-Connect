import React, {Component} from 'react';
import {Text, View, Alert, Linking, Image} from 'react-native';
import styles from './styles';

import auth from '@react-native-firebase/auth';

// api
import {clearStorageUserId} from '@api/upvise';

import {getReadableVersion} from 'react-native-device-info';

import {List} from 'react-native-paper';
import {Divider} from 'react-native-elements';

// svg icon
import MailIcon from './SvgIcon/MailIcon';
import LogoutIcon from './SvgIcon/LogoutIcon';
import UpdatedIcon from './SvgIcon/UpdatedIcon';
import PrivacyPolicyIcon from './SvgIcon/PrivacyPolicyIcon';

//redux
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';

//redux, selector
import {logoutUser} from '@store/user';
import {selectEmail} from 'selector/user';
import {selectUser, selectOrganistation} from 'selector/sanspaper';
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

  onPressLogoutHandler = () => {
    Alert.alert(
      '',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Logout',
          onPress: async () => {
            await auth().signOut();
            await clearStorageUserId();
            this.props.logoutUser();
          },
        },
      ],
      {cancelable: false},
    );
  };

  render() {
    const {email, user, organization} = this.props;
    const name = user?._data?.name;

    return (
      <>
        <View style={styles.container}>
          <View style={styles.top}>
            <Image
              source={require('../../assets/user.png')}
              resizeMode="contain"
              resizeMethod="auto"
              style={styles.profileLogo}
            />
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

const mapState = createStructuredSelector({
  email: selectEmail,
  user: selectUser,
  organization: selectOrganistation,
});

export default connect(mapState, {logoutUser})(Profile);
