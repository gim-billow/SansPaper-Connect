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
  Alert,
} from 'react-native';
import {Button, Divider} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
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
import {
  loginUser,
  loginWithGoogle,
  resetLoginCode,
  loginWithApple,
} from '@store/user';
import {selectUserStatus, selectLoginCode} from '@selector/user';
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
        visible: false,
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
    errorPass: '',
    errorUser: '',
    changeLogo: false,
    loading: false,
    icon: 'eye-slash',
    showAlert: false,
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
    const {username, password, errorPass, errorUser} = this.state;

    if (errorPass || errorUser) {
      this.setState({errorPass: '', errorUser: ''});
    }

    const payload = {username, password};
    try {
      await loginSchema.validate(payload);
      Keyboard.dismiss();
      this.props.loginUser(payload);
      this.setState({error: ''});
    } catch (e) {
      let errorMessage = '';
      if (e && e.message.includes('username')) {
        errorMessage = capitalize(e.message);
        this.setState({errorUser: errorMessage});
      } else if (e && e.message.includes('password')) {
        errorMessage = capitalize(e.message);
        this.setState({errorPass: errorMessage});
      }
    }
  };

  alertLogin = (message, action) =>
    Alert.alert(
      'Login Error',
      message,
      [
        {
          text: 'OK',
          onPress: () => {
            this.props.resetLoginCode();
            this.setState({showAlert: false});
          },
          style: 'cancel',
        },
      ],
      {cancelable: false},
    );

  render() {
    const {
      errorUser,
      errorPass,
      changeLogo,
      username,
      password,
      showAlert,
    } = this.state;
    const {mainLogo, horizontalLogo} = CommonImages;
    const {
      loginCode,
      loginWithGoogle: googleAuthLogin,
      loginWithApple: appleLogin,
    } = this.props;

    if (loginCode && loginCode === 'sso/error-login' && !showAlert) {
      this.setState({showAlert: true});
      this.alertLogin('Register to Platform Hub and join an organisation.');
    } else if (
      loginCode &&
      (loginCode === 'auth/wrong-password' ||
        loginCode === 'auth/user-not-found') &&
      !showAlert
    ) {
      this.setState({showAlert: true});
      this.alertLogin('Username or Password incorrect');
    }

    return (
      <>
        <KeyboardAvoidingView
          style={styles.new_container}
          behavior={behavior}
          contentContainerStyle={{flex: 1, justifyContent: 'center'}}>
          <View style={{alignItems: 'center'}}>
            <Image
              source={mainLogo}
              // style={changeLogo ? styles.logoHorizontal : styles.logo}
              // source={changeLogo ? horizontalLogo : mainLogo}
              style={styles.new_logo}
              resizeMode="contain"
              resizeMethod="auto"
            />
          </View>
          <IconTextInput
            onChangeText={this.onUserNameChange}
            iconProps={{...iconProps, name: 'envelope'}}
            placeHolder="E-Mail Address"
            error={errorUser}
            value={username}
          />
          <IconTextInput
            onChangeText={this.onPasswordChange}
            iconProps={{...iconProps, name: 'lock'}}
            iconEyeProps={{...iconProps, name: this.state.icon}}
            placeHolder="Password"
            secureTextEntry={this.state.securePassword}
            onPressIcon={this.onChangeIcon}
            error={errorPass}
            value={password}
          />
          <View style={styles.new_submitBtn}>
            <Button
              title="Login"
              raised
              buttonStyle={styles.new_submitBtnStyle}
              onPress={this.onLoginPress}
            />
            <TouchableOpacity style={styles.forgot} onPress={() => {}}>
              <Text style={styles.forgotText}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.connect}>
            <Divider style={{flex: 1}} />
            <Text style={styles.connectText}>OR</Text>
            <Divider style={{flex: 1}} />
          </View>
          <View style={styles.new_submitBtn}>
            <Button
              title="Login with Google"
              raised
              icon={
                <Icon
                  name="google"
                  size={16}
                  color="white"
                  style={{paddingRight: 10}}
                />
              }
              buttonStyle={styles.googleBtn}
              onPress={googleAuthLogin}
            />
          </View>
          {/* /**
           * TODO:
           * to be implemented by GIM
           * MICROSOFT SSO

          <View style={styles.new_submitBtn}>
            <Button
              title="Login with Microsoft"
              raised
              icon={
                <Icon
                  name="windows"
                  size={16}
                  color="white"
                  style={{paddingRight: 10}}
                />
              }
              buttonStyle={styles.microsoftBtn}
              onPress={() => {}}
            />
          </View> */}
          {/* {Platform.OS === 'ios' ? (
            <View style={styles.new_submitBtn}>
              <Button
                title="Login with Apple"
                raised
                icon={
                  <Icon
                    name="apple"
                    size={18}
                    color="white"
                    style={{paddingRight: 10}}
                  />
                }
                buttonStyle={styles.appleBtn}
                onPress={appleLogin}
              />
            </View>
          ) : null} */}
        </KeyboardAvoidingView>
      </>
    );
  }
}

const mapState = createStructuredSelector({
  isUserLogin: selectUserStatus,
  loginCode: selectLoginCode,
});

export default connect(mapState, {
  loginUser,
  init,
  resetLoginCode,
  loginWithGoogle,
  loginWithApple,
})(LoginScreen);
