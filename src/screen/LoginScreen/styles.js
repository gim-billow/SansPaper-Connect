import {StyleSheet} from 'react-native';
import {lightGrey, lightRed, darkGrey, red, blue} from '@styles/colors';
import {small} from '@styles/font';

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
  forgot: {
    alignSelf: 'flex-end',
    marginTop: 5,
  },
  forgotText: {
    color: darkGrey,
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
});

export const iconProps = {
  color: lightGrey,
  size: 20,
};
