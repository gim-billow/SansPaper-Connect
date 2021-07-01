//library
import React from 'react';
import {View} from 'react-native';
import {connectActionSheet} from '@expo/react-native-action-sheet';
import ImagePicker from 'react-native-image-crop-picker';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {NavigationComponent, Navigation} from 'react-native-navigation';
import FAIcon from 'react-native-vector-icons/FontAwesome';

import styles from './styles';
import {selectEmail, selectProfilePicture} from 'selector/user';
import {selectUser, selectOrganistation} from 'selector/sanspaper';
import {selectNetworkInfo} from 'selector/common';
import {logoutUser, saveProfilePicture} from '@store/user';
import {commonStyles} from '@styles/common';
import Profile from '@components/Profile';

const setIcon = (name) => <FAIcon key={name} name={name} size={20} />;

class ProfileScreen extends NavigationComponent {
  constructor(props) {
    super(props);

    this._onOpenActionSheet = this._onOpenActionSheet.bind(this);

    Navigation.events().bindComponent(this);
  }

  openFromCamera() {
    ImagePicker.clean()
      .then(() => {
        return ImagePicker.openCamera({
          includeBase64: true,
        });
      })
      .then((image) => {
        this.props.saveProfilePicture(image.data);
      });
  }

  openFromGallery() {
    ImagePicker.clean()
      .then(() => {
        return ImagePicker.openPicker({
          includeBase64: true,
        });
      })
      .then((image) => {
        this.props.saveProfilePicture(image.data);
      });
  }

  _onOpenActionSheet = () => {
    const options = ['From camera', 'From gallery', 'Cancel'];
    const cancelButtonIndex = 2;
    const icons = [setIcon('camera'), setIcon('image'), setIcon('times')];

    this.props.showActionSheetWithOptions(
      {
        options,
        icons,
        cancelButtonIndex,
        textStyle: {...commonStyles.actionSheetAndroid},
      },
      (buttonIndex) => {
        switch (buttonIndex) {
          case 0:
            this.openFromCamera();
            break;
          case 1:
            this.openFromGallery();
            break;
          default:
            break;
        }
      },
    );
  };

  render() {
    const {
      organization,
      email,
      user,
      networkInfo,
      profilePicture,
      loadingImg,
      logoutUser,
    } = this.props;

    return (
      <View style={styles.container}>
        <Profile
          openActionSheet={this._onOpenActionSheet}
          email={email}
          user={user}
          networkInfo={networkInfo}
          organization={organization}
          loadingImg={loadingImg}
          profilePicture={profilePicture}
          logoutUser={logoutUser}
        />
      </View>
    );
  }
}

const mapState = createStructuredSelector({
  email: selectEmail,
  user: selectUser,
  networkInfo: selectNetworkInfo,
  organization: selectOrganistation,
  profilePicture: selectProfilePicture,
});

export default connect(mapState, {logoutUser, saveProfilePicture})(
  connectActionSheet(ProfileScreen),
);
