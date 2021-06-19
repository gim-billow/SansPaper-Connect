import {StyleSheet, Dimensions} from 'react-native';
import {superSmall, spaceSmall, spaceLarge, spaceRegular} from 'styles/space';
import {regular, medium} from 'styles/font';
import {lightRed, darkRed, white, red} from '@styles/colors';
import {questrial} from '../../../styles/font';

const width = Dimensions.get('screen').width;

export default StyleSheet.create({
  topContainer: {
    marginVertical: spaceLarge,
  },
  container: {
    borderRadius: 10,
    paddingVertical: 10,
    width: width / 2,
  },
  buttonColor: {
    backgroundColor: 'white',
  },
  ChangeButtonColor: {
    backgroundColor: darkRed,
  },
  disableText: {
    color: white,
  },
  disable: {
    backgroundColor: red,
  },
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
  modalText: {
    marginTop: 15,
    marginLeft: spaceRegular,
    textAlign: 'left',
    fontSize: medium,
    color: white,
    fontFamily: questrial,
    letterSpacing: 0.2,
  },
  icon: {
    marginTop: 12,
    marginLeft: 10,
  },
  button: {
    marginTop: spaceRegular,
  },
  qrBackBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  QrResult: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginTop: spaceSmall,
  },
  qrResultText: {
    marginTop: superSmall,
    fontFamily: questrial,
    letterSpacing: 0.2,
  },
  qrBorderColor: {
    borderColor: darkRed,
  },
  title: {
    fontFamily: questrial,
    letterSpacing: 0.5,
    fontSize: regular,
  },
});
