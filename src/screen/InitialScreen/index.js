//library
import React from 'react';
import {connect} from 'react-redux';
import {View, ActivityIndicator, Image} from 'react-native';
import auth from '@react-native-firebase/auth';

//styles
import styles from './styles';

//constants
import {CommonImages} from '@constant/Images';
import {darkGrey} from '@styles/colors';

//navigation
import {showLoginScreen} from '@navigation';

//redux
import {init} from '@store/common';

class InitialScreen extends React.Component {
  static options = () => {
    const option = {
      topBar: {
        visible: false,
      },
    };
    return option;
  };

  state = {
    sync: false,
  };

  authListener;

  componentDidMount() {
    this.authListener = auth().onAuthStateChanged(this._onAuthStateChanged);
  }

  componentWillUnmount() {
    this.authListener = null;
  }

  _onAuthStateChanged = (user) => {
    if (user) {
      if (!this.state.sync) {
        this.setState({sync: true});
        this.props.init(user);
      }
    } else {
      showLoginScreen();
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.logo}
          source={CommonImages.mainLogo}
          resizeMode="contain"
          resizeMethod="scale"
        />
        <ActivityIndicator size="large" color={darkGrey} />
      </View>
    );
  }
}

export default connect(null, {init})(InitialScreen);
