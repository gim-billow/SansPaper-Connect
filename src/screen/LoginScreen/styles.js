import {StyleSheet, Dimensions} from 'react-native';
import {lightGrey, darkGrey, red, blue, white} from '@styles/colors';
import {regular, questrial} from '@styles/font';
import {medium} from '../../styles/font';

const {width} = Dimensions.get('screen');

export default StyleSheet.create({
  new_container: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 20,
    backgroundColor: white,
  },
  new_submitBtn: {
    marginHorizontal: 30,
    marginTop: 10,
  },
  new_submitBtnStyle: {
    paddingVertical: 15,
    backgroundColor: red,
    borderRadius: 15,
  },
  loginIcon: {
    marginRight: 10,
  },
  divider: {
    marginVertical: 20,
    marginHorizontal: 30,
  },
  connect: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 30,
    marginVertical: 20,
  },
  connectText: {
    fontSize: regular,
    color: darkGrey,
    marginHorizontal: 10,
    fontFamily: questrial,
    letterSpacing: 0.5,
  },
  new_logo: {
    width: 200,
    height: 200,
  },
  googleBtn: {
    paddingVertical: 10,
    backgroundColor: red,
  },
  microsoftBtn: {
    paddingVertical: 10,
    backgroundColor: blue,
  },
  appleBtn: {
    paddingVertical: 10,
    backgroundColor: '#000',
  },
  helperContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // backgroundColor: 'red',
  },
  checkbox: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    paddingLeft: 0,
    margin: 0,
  },
  checkboxText: {
    marginLeft: 5,
    fontWeight: '400',
    color: darkGrey,
    fontFamily: questrial,
    letterSpacing: 0.2,
  },
  loginText: {
    fontFamily: questrial,
    fontSize: regular,
    letterSpacing: 0.5,
  },
  forgot: {
    alignSelf: 'center',
    backgroundColor: 'transparent',
    padding: 13,
  },
  forgotText: {
    color: darkGrey,
    fontFamily: questrial,
    letterSpacing: 0.2,
  },

  /**
   *
   * OLD STYLES
   */
  // container: {
  //   flex: 1,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   marginBottom: 10,
  // },
  // box: {
  //   width: '100%',
  //   height: 60,
  //   alignItems: 'center',
  //   justifyContent: 'space-between',
  // },
  // logo: {
  //   width: 300,
  //   height: 200,
  // },
  // logoHorizontal: {
  //   width: 300,
  //   height: 100,
  // },
  // text: {
  //   marginTop: '10%',
  //   fontSize: medium,
  // },
  // buttonText: {
  //   color: 'white',
  //   fontWeight: 'bold',
  //   fontSize: medium,
  // },
  // errorBox: {
  //   width: '60%',
  //   paddingTop: 10,
  //   paddingBottom: 10,
  // },
  // button: {
  //   marginTop: '5%',
  //   width: '60%',
  //   height: 40,
  //   backgroundColor: lightRed,
  //   borderRadius: 3,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   elevation: 2,
  //   shadowColor: darkRed,
  //   shadowOffset: {width: 1, height: 2},
  //   shadowOpacity: 0.8,
  //   shadowRadius: 1,
  // },

  /**
   * Overlay styles
   */
  closeTxtOverlay: {
    color: '#fff',
    fontFamily: questrial,
    letterSpacing: 0.2,
  },
  closeBtnOverlay: {
    alignSelf: 'stretch',
    backgroundColor: red,
    paddingVertical: 15,
    marginBottom: 10,
    marginTop: 20,
    borderRadius: 15,
    marginHorizontal: 10,
  },
  iconSpace: {
    padding: 10,
  },
  overlayHeaderText: {
    fontFamily: questrial,
    fontSize: medium,
    letterSpacing: 0.2,
  },
  overlaySubText: {
    marginTop: 10,
    textAlign: 'center',
    color: darkGrey,
    fontFamily: questrial,
    letterSpacing: 0.2,
  },
  overlayHeader: {
    alignItems: 'center',
    marginBottom: 15,
  },
  backdrop: {
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  overlay: {
    borderRadius: 20,
    width: width - 50,
    padding: 20,
  },
  overlayTitle: {
    fontFamily: questrial,
    fontSize: regular,
    letterSpacing: 0.2,
    paddingLeft: 5,
  },
  inputContainer: {
    borderWidth: 1,
    borderRadius: 15,
    borderColor: lightGrey,
    paddingHorizontal: 10,
  },
  error: {
    borderWidth: 1,
    borderRadius: 15,
    borderColor: red,
    paddingHorizontal: 10,
  },
  errorView: {
    flex: 1,
    marginBottom: 1,
  },
});

export const iconProps = {
  color: lightGrey,
  size: 20,
};
