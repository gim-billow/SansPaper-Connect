//library
import React from 'react';
import {connect} from 'react-redux';
import {
  View,
  Image,
  Text,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
} from 'react-native';
import {createStructuredSelector} from 'reselect';
import auth from '@react-native-firebase/auth';
import * as yup from 'yup';

//styles
import styles, {iconProps} from './styles';
import {errorStyle} from 'styles/common';
import {red} from 'styles/colors';

//constants
import {CommonImages} from 'constant/Images';
import {behavior} from 'constant/KeyboardAvoiding';

//components
import IconTextInput from '@components/IconTextInput';

//util
import {capitalize} from '@util/string';

//redux
import {loginUser} from '@store/user';
import {selectUserStatus} from '@selector/user';
import {init} from '@store/common';

const loginSchema = yup.object().shape({
  username: yup.string().required().email(),
  password: yup.string().required(),
});

class LoginScreen extends React.Component {
  static options = () => {
    const option = {
      topBar: {
        title: {
          text: 'Login',
        },
      },
      statusBar: {
        visible: true,
        backgroundColor: red,
        styles: 'light',
      },
    };
    return option;
  };

  state = {
    username: '',
    password: '',
    securePassword: true,
    error: '',
    changeLogo: false,
    loading: false,
    icon: 'eye-slash',
  };

  keyboardDidShowListener;
  keyboardDidHideListener;
  firebaseListener;
  keyboardActive = false;

  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this._keyboardDidShow,
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this._keyboardDidHide,
    );

    this.authListener = auth().onAuthStateChanged(this._onAuthStateChanged);
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
    this.authListener = null;
  }

  _onAuthStateChanged = (user) => {
    if (user) {
      if (!this.state.sync) {
        this.setState({sync: true});
        this.props.init(user);
      }
    }
  };

  _keyboardDidShow = () => {
    const height = Dimensions.get('window').height;
    if (Platform.OS === 'android' && height < 700) {
      this.setState({changeLogo: true});
    }
  };

  _keyboardDidHide = () => {
    this.setState({changeLogo: false});
  };

  onUserNameChange = (username) => {
    this.setState({username});
  };

  onPasswordChange = (password) => {
    this.setState({password});
  };

  onChangeIcon = (icon) => {
    this.setState((prevState) => ({
      icon: prevState.icon === 'eye' ? 'eye-slash' : 'eye',
      securePassword: !prevState.securePassword,
    }));
  };

  onLoginPress = async () => {
    const {username, password} = this.state;
    const payload = {username, password};
    try {
      await loginSchema.validate(payload);
      Keyboard.dismiss();
      this.props.loginUser(payload);
      this.setState({error: ''});
    } catch (e) {
      const errorMessage = e.message ? capitalize(e.message) : '';
      this.setState({error: errorMessage});
    }
  };

  render() {
    const {error, changeLogo} = this.state;
    const {mainLogo, horizontalLogo} = CommonImages;

    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior={behavior}
        keyboardVerticalOffset="150">
        <Image
          style={styles.logo}
          source={mainLogo}
          resizeMode="contain"
          resizeMethod="scale"
        />
        <View style={styles.errorBox}>
          {error !== '' ? (
            <Text style={errorStyle.text}>{error}</Text>
          ) : (
            <View />
          )}
        </View>
        <View style={styles.box}>
          <IconTextInput
            onChangeText={this.onUserNameChange}
            iconProps={{...iconProps, name: 'user'}}
            placeHolder="E-Mail Address"
          />
          <IconTextInput
            onChangeText={this.onPasswordChange}
            iconProps={{...iconProps, name: 'lock'}}
            iconEyeProps={{...iconProps, name: this.state.icon}}
            placeHolder="Password"
            secureTextEntry={this.state.securePassword}
            onPressIcon={this.onChangeIcon}
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={this.onLoginPress}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    );
  }
}

const mapState = createStructuredSelector({
  isUserLogin: selectUserStatus,
});

export default connect(mapState, {loginUser, init})(LoginScreen);
