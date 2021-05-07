import {StyleSheet, Dimensions} from 'react-native';
import {lightGrey, lightRed, darkGrey, red, blue} from '@styles/colors';
import {small} from '@styles/font';

const {width} = Dimensions.get('screen');

export default StyleSheet.create({
  new_container: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 20,
  },
  new_submitBtn: {
    marginHorizontal: 30,
    marginTop: 10,
  },
  new_submitBtnStyle: {
    paddingVertical: 10,
    backgroundColor: lightRed,
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
    fontSize: small,
    color: darkGrey,
    marginHorizontal: 10,
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
  },
  forgot: {
    alignSelf: 'center',
    backgroundColor: 'transparent',
    // marginTop: 5,
    padding: 13,
  },
  forgotText: {
    color: darkGrey,
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
  },
  closeBtnOverlay: {
    alignSelf: 'stretch',
    backgroundColor: red,
    paddingVertical: 10,
    marginBottom: 10,
    marginTop: 10,
    marginHorizontal: 10,
  },
  iconSpace: {
    padding: 10,
  },
  overlayHeaderText: {
    marginBottom: 20,
    alignItems: 'center',
  },
  overlaySubText: {
    marginTop: 20,
    textAlign: 'center',
    color: darkGrey,
  },
  overlayHeader: {
    alignItems: 'center',
  },
  backdrop: {
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  overlay: {
    borderRadius: 5,
    width: width - 50,
    padding: 20,
  },
  inputContainer: {
    borderWidth: 1,
    borderRadius: 3,
    borderColor: lightGrey,
    paddingHorizontal: 10,
  },
  error: {
    borderWidth: 1,
    borderRadius: 3,
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
