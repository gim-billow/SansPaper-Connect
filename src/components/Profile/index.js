import React, {Component} from 'react';
import {Text, View, Alert, Modal, TextInput, ScrollView} from 'react-native';
import styles from './styles';

import auth from '@react-native-firebase/auth';

// api
import {clearStorageUserId} from '@api/upvise';

import {getReadableVersion} from 'react-native-device-info';

import {Button, List} from 'react-native-paper';
import {Divider} from 'react-native-elements';

// icons
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

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
      'Log out',
      'Are you sure with this action? Logging out will clear all the stored forms data from your phone for offline usage.',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Yes',
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
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.subText}>{organization.name}</Text>
          </View>
          <Divider />
          {/* email */}
          <View style={styles.listContainer}>
            <List.Item
              style={styles.list}
              titleStyle={styles.title}
              title="Email"
              description={email}
              left={() => (
                <View style={styles.listIcon}>
                  <MailIcon width={30} height={40} color="green" />
                </View>
              )}
            />
          </View>
          <Divider />
          {/* change password */}
          {/* <View style={styles.listContainer}>
            <List.Item
              onPress={this.showModal}
              style={styles.list}
              titleStyle={styles.title}
              title="Change Password"
              description="*********"
              left={() => (
                <View style={styles.listIcon}>
                  <MaterialIcons name="lock" size={30} color="green" />
                </View>
              )}
            />
          </View>
          <Divider /> */}
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
                  <UpdatedIcon width={30} height={40} color="green" />
                </View>
              )}
            />
          </View>
          <Divider />
          {/* logout */}
          <View style={styles.listContainer}>
            <List.Item
              onPress={this.onPressLogoutHandler}
              style={styles.list}
              titleStyle={styles.title}
              title="Logout"
              left={() => (
                <View style={styles.listIcon}>
                  <LogoutIcon width={30} height={40} color="red" />
                </View>
              )}
            />
          </View>
          <Divider />
          {/* Privacy Policy */}
          <View style={styles.listContainer}>
            <List.Item
              onPress={() => Linking.openURL('https://sanspaper.com/privacy-policy/')}
              style={styles.list}
              titleStyle={styles.title}
              title="Privacy and Policy"
              description={privacy}
              left={() => (
                <View style={styles.listIcon}>
                  <PrivacyPolicyIcon width={30} height={40} color="green" />
                </View>
              )}
            />
          </View>
        </View>

        {/* <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.visible}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.changePasswordText}>Change Password</Text>
              <Text style={styles.passwordTextStyle}>Old Password</Text>
              <TextInput style={styles.textInput} />
              <Text style={styles.passwordTextStyle}>New Password</Text>
              <TextInput style={styles.textInput} />
              <Text style={styles.passwordTextStyle}>Retype Password</Text>
              <TextInput style={styles.textInput} />
              <View style={styles.changePasswordSubContainer}>
                <Button
                  style={styles.marginLeftRegular}
                  mode="contained"
                  onPress={this.hideModal}>
                  <Text>Cancel</Text>
                </Button>
                <Button
                  style={styles.marginLeftSmall}
                  mode="contained"
                  onPress={() => {}}>
                  <Text>Confirm</Text>
                </Button>
              </View>
            </View>
          </View>
        </Modal> */}
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
