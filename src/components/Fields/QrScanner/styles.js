import {StyleSheet} from 'react-native';
import {spaceSmall, spaceMedium, spaceRegular} from 'styles/space';
import {regular} from 'styles/font';
import {lightRed, darkRed} from '@styles/colors';

export default StyleSheet.create({
  text: {
    fontSize: regular,
    paddingTop: spaceSmall,
    paddingLeft: spaceSmall,
    paddingRight: spaceMedium,
  },
  buttonColor: {
    backgroundColor: 'white',
  },
  ChangeButtonColor: {
    backgroundColor: darkRed,
  },
  buttonMargin: {
    // paddingBottom: 10,
  },
  TextColor: {
    color: lightRed,
  },
  ChangeTextColor: {
    color: 'white',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: darkRed,
    width: '100%',
  },
  h: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 100,
  },
  qrArea: {
    backgroundColor: 'black',
  },
  modalView: {
    backgroundColor: 'white',
    height: '100%',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginTop: 15,
    marginLeft: 20,
    textAlign: 'left',
    fontSize: 20,
    color: 'white',
  },
  icon: {
    marginTop: 12,
    marginLeft: 10,
  },
  button: {
    fontSize: regular,
    paddingTop: spaceSmall,
    paddingLeft: spaceSmall,
    paddingRight: spaceSmall,
    paddingBottom: spaceSmall,
    width: '100%',
  },
  QrResult: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
  },
});
