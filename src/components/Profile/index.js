import React, {Component} from 'react';
import {
  Text,
  View,
  Alert,
  Modal,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import styles from './styles';

import auth from '@react-native-firebase/auth';

// api
import {clearStorageUserId} from '@api/upvise';

import {getReadableVersion} from 'react-native-device-info';

// downdown
import {Picker} from 'native-base';

import {ProgressBar, Colors, TouchableRipple, Button} from 'react-native-paper';

// icons
import EvilIcons5 from 'react-native-vector-icons/EvilIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// svg icon
import MailIcon from './SvgIcon/MailIcon';
import LogoutIcon from './SvgIcon/LogoutIcon';
import UpdatedIcon from './SvgIcon/UpdatedIcon';

//redux
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';

//redux, selector
import {logoutUser} from '@store/user';
import {selectEmail} from 'selector/user';
import {selectUser} from 'selector/sanspaper';

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

  containerStyle = {
    backgroundColor: 'white',
    padding: 20,
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
    const {email, user} = this.props;
    const name = user?._data?.name;
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.userContainer}>
            <Text style={styles.nametext}>{name}</Text>
            {/*
            <EvilIcons5 name="user" size={60} style={styles.userIcon} />
            <View style={{flexDirection: 'row', paddingBottom: 2}}>
              <MaterialCommunityIcons
                name="medal"
                size={20}
                style={{color: 'gray'}}
              />
              <MaterialCommunityIcons
                name="medal"
                size={20}
                style={{color: 'orange', paddingLeft: 190}}
              />
            </View>
            <ProgressBar progress={0.7} color={Colors.green400} width={230} />
            <View style={{flex: 1, flexDirection: 'row', paddingTop: 2}}>
              <Text style={styles.laveltext}>LEVEL 2</Text>
              <Text style={styles.pointstext}>15,000 POINTS</Text>
            </View>
            */}
          </View>
          <View style={styles.rowContainer}>
            <MailIcon width={30} height={40} color="green" />
            <View style={styles.textView}>
              <Text style={styles.labeltext}>EMAIL</Text>
              <Text style={styles.text}>{email}</Text>
            </View>
          </View>
          <TouchableOpacity onPress={this.showModal} rippleColor="green">
            <View style={styles.rowContainer}>
              <MaterialIcons name="lock" size={30} color="green" />
              <View style={styles.textView}>
                <Text style={styles.labeltext}>Change Password</Text>
                <Text style={styles.text}>********</Text>
              </View>
            </View>
          </TouchableOpacity>
          <View style={styles.rowContainer}>
            <MaterialIcons name="settings" size={30} color="green" />
            <Picker
              note
              mode="dropdown"
              placeholder="Font size"
              placeholderStyle={{color: '#000000', fontWeight: 'bold'}}
              iosIcon={
                <AntDesign
                  name="caretdown"
                  size={1}
                  style={{paddingLeft: 100}}
                />
              }
              textStyle={{color: '#000000', fontWeight: 'bold', width: 130}}
              selectedValue={this.state.selected}
              onValueChange={this.onDropItemChange.bind(this)}>
              <Picker.Item label="Extra Small" value="Extra Small" />
              <Picker.Item label="Small" value="Small" />
              <Picker.Item label="Default" value="Default" />
              <Picker.Item label="Large" value="Large" />
              <Picker.Item label="Extra Large" value="Extra Large" />
            </Picker>
          </View>
          <View style={styles.rowContainer}>
            <UpdatedIcon width={30} height={40} color="green" />
            <View style={styles.textView}>
              <Text style={styles.labeltext}>Update</Text>
              <Text style={styles.updatedtext}>Updated</Text>
              <Text style={styles.versiontext}>
                Current Version : {getReadableVersion()}
              </Text>
            </View>
          </View>
          <TouchableOpacity onPress={this.onPressLogoutHandler}>
            <View style={styles.logoutContainer}>
              <LogoutIcon width={30} height={40} color="red" />
              <Text style={[styles.textView, styles.labeltext]}>Log out</Text>
            </View>
          </TouchableOpacity>
          <Modal
            animationType="fade"
            transparent={true}
            visible={this.state.visible}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text
                  style={{fontSize: 20, fontWeight: 'bold', paddingBottom: 30}}>
                  Change Password
                </Text>
                <Text style={styles.passwordTextStyle}>Old Password</Text>
                <TextInput style={styles.textInput} />
                <Text style={styles.passwordTextStyle}>New Password</Text>
                <TextInput style={styles.textInput} />
                <Text style={styles.passwordTextStyle}>Retype Password</Text>
                <TextInput style={styles.textInput} />
                <View style={{flexDirection: 'row', paddingTop: 20}}>
                  <Button
                    style={{marginLeft: 70}}
                    mode="contained"
                    onPress={this.hideModal}>
                    <Text>Cancel</Text>
                  </Button>
                  <Button
                    style={{marginLeft: 20}}
                    mode="contained"
                    onPress={() => {}}>
                    <Text>Confirm</Text>
                  </Button>
                </View>
              </View>
            </View>
          </Modal>
        </ScrollView>
      </View>
    );
  }
}

const mapState = createStructuredSelector({
  email: selectEmail,
  user: selectUser,
});

export default connect(mapState, {logoutUser})(Profile);
