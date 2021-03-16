import {StyleSheet} from 'react-native';
import {spaceSmall, spaceMedium, spaceRegular} from 'styles/space';
import {regular, medium} from 'styles/font';
import {lightRed, darkRed, white} from '@styles/colors';
import {superSmall} from '../../../styles/space';

export default StyleSheet.create({
  // text: {
  //   fontSize: regular,
  //   paddingTop: spaceSmall,
  //   paddingLeft: spaceSmall,
  //   paddingRight: spaceMedium,
  // },
  container: {
    marginVertical: spaceMedium,
  },
  buttonColor: {
    backgroundColor: 'white',
  },
  ChangeButtonColor: {
    backgroundColor: darkRed,
  },
  // buttonMargin: {
  //   paddingBottom: 10,
  // },
  TextColor: {
    color: lightRed,
  },
  ChangeTextColor: {
    color: white,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  h: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  qrArea: {
    backgroundColor: 'black',
  },
  // modalView: {
  //   backgroundColor: 'white',
  //   height: '100%',
  // },
  // textStyle: {
  //   color: 'white',
  //   fontWeight: 'bold',
  //   textAlign: 'center',
  // },
  modalText: {
    marginTop: 15,
    marginLeft: spaceRegular,
    textAlign: 'left',
    fontSize: medium,
    color: white,
  },
  icon: {
    marginTop: 12,
    marginLeft: 10,
  },
  button: {
    // padding: spaceRegular,
    paddingHorizontal: spaceRegular,
    marginTop: spaceSmall,
    // backgroundColor: 'red',
    // fontSize: regular,
    // paddingTop: spaceSmall,
    // paddingLeft: spaceSmall,
    // paddingRight: spaceSmall,
    // paddingBottom: spaceSmall,
    // width: '100%',
  },
  qrBackBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  QrResult: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // padding: 10,
    marginTop: spaceSmall,
  },
  qrResultText: {
    marginTop: superSmall,
  },
  // centerText: {
  //   flex: 1,
  //   fontSize: 18,
  //   padding: 32,
  //   color: '#777',
  // },
  // textBold: {
  //   fontWeight: '500',
  //   color: '#000',
  // },
  // buttonText: {
  //   fontSize: 21,
  //   color: 'rgb(0,122,255)',
  // },
  // buttonTouchable: {
  //   padding: 16,
  // },
});
