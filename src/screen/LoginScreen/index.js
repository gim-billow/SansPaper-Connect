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
import {
  Button,
  Input,
  CheckBox,
  Overlay,
  Text as RNEText,
} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {createStructuredSelector} from 'reselect';
import auth from '@react-native-firebase/auth';
import * as yup from 'yup';

//styles
import styles, {iconProps} from './styles';
import {lightRed, red} from 'styles/colors';

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
  loginWithApple,
  saveUser,
  forgotPasswordUser,
} from '@store/user';
import {selectUserStatus, selectLoginCode} from '@selector/user';
import {init} from '@store/common';
import {readUserEmail} from '@api/user';

const forgotEmailSchema = yup.object().shape({
  forgotPassEmail: yup.string().required().email(),
});

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
    forgotPassEmail: '',
    password: '',
    securePassword: true,
    errorPass: '',
    errorUser: '',
    errorForgotPassEmail: '',
    changeLogo: false,
    loading: false,
    icon: 'eye-slash',
    showAlert: false,
    remember: false,
    forgotPassOverlay: false,
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

    // check if user email is remembered
    this.readUserEmail();
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

  readUserEmail = async () => {
    const {username, saveUser: isSavedUser} = await readUserEmail();

    if (username && isSavedUser) {
      this.setState({username: username, remember: isSavedUser});
    }
  };

  onUserNameChange = (username) => {
    this.setState({username});
  };

  onPasswordChange = (password) => {
    this.setState({password});
  };

  onChangeForgotPasswordEmail = (email) => {
    this.setState({forgotPassEmail: email});
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

  onForgotPasswordPress = async () => {
    const {forgotPassEmail, errorForgotPassEmail} = this.state;
    const {forgotPasswordUser} = this.props;

    if (errorForgotPassEmail) {
      this.setState({errorForgotPassEmail: ''});
    }

    try {
      await forgotEmailSchema.validate({forgotPassEmail});
      Keyboard.dismiss();

      forgotPasswordUser({email: forgotPassEmail});

      this.setState({errorForgotPassEmail: '', forgotPassOverlay: false});
    } catch (e) {
      let errorMessage = '';
      if (e && e.message.includes('forgotPassEmail')) {
        if (forgotPassEmail) {
          errorMessage = 'Input must be a valid email address';
        } else {
          errorMessage = 'Email address is a required field';
        }
        this.setState({errorForgotPassEmail: errorMessage});
      }
    }
  };

  onChangeRememberMe = (e) => {
    const {saveUser: saveUserEmail} = this.props;

    saveUserEmail(!this.state.remember);
    this.setState({remember: !this.state.remember});
  };

  onToggleForgotPassOverlay = () => {
    this.setState({
      forgotPassOverlay: !this.state.forgotPassOverlay,
      errorForgotPassEmail: '',
      forgotPassEmail: '',
    });
  };

  render() {
    const {
      errorUser,
      errorPass,
      errorForgotPassEmail,
      username,
      password,
      remember,
      forgotPassOverlay,
      forgotPassEmail,
    } = this.state;
    const {mainLogo} = CommonImages;
    const {loginCode} = this.props;

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
              disabled={loginCode === 'locked'}
            />
            <View style={styles.helperContainer}>
              <CheckBox
                containerStyle={styles.checkbox}
                title="Remember me"
                onPress={this.onChangeRememberMe}
                checked={remember}
                textStyle={styles.checkboxText}
                checkedColor={lightRed}
              />
              <TouchableOpacity
                style={styles.forgot}
                onPress={this.onToggleForgotPassOverlay}>
                <Text style={styles.forgotText}>Forgot Password?</Text>
              </TouchableOpacity>
            </View>
          </View>
          {/*
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
        <Overlay
          animationType="fade"
          overlayStyle={styles.overlay}
          backdropStyle={styles.backdrop}
          isVisible={forgotPassOverlay}
          onBackdropPress={this.onToggleForgotPassOverlay}>
          <View style={styles.overlayHeader}>
            <View style={styles.overlayHeaderText}>
              <RNEText h4>Forgot Password</RNEText>
              <Text style={styles.overlaySubText}>
                Enter your email below to receive a password reset link
              </Text>
            </View>
          </View>
          <Input
            placeholder="Enter email address"
            leftIcon={
              <Icon name="envelope" {...iconProps} style={{width: 20}} />
            }
            inputContainerStyle={
              !errorForgotPassEmail ? styles.inputContainer : styles.error
            }
            autoCapitalize="none"
            value={forgotPassEmail}
            errorMessage={errorForgotPassEmail}
            onChangeText={this.onChangeForgotPasswordEmail}
            errorStyle={!errorForgotPassEmail ? styles.errorView : undefined}
          />
          <Button
            title="Send Recovery Email"
            onPress={this.onForgotPasswordPress}
            buttonStyle={styles.closeBtnOverlay}
            titleStyle={styles.closeTxtOverlay}
          />
        </Overlay>
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
  loginWithGoogle,
  loginWithApple,
  saveUser,
  forgotPasswordUser,
})(LoginScreen);
