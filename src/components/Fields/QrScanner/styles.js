import {StyleSheet} from 'react-native';
import {spaceSmall, spaceMedium, spaceRegular} from 'styles/space';
import {regular, medium} from 'styles/font';
import {lightRed, darkRed, white} from '@styles/colors';
import {superSmall} from '../../../styles/space';

export default StyleSheet.create({
  container: {
    marginVertical: spaceMedium,
  },
  buttonColor: {
    backgroundColor: 'white',
  },
  ChangeButtonColor: {
    backgroundColor: darkRed,
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
  },
  icon: {
    marginTop: 12,
    marginLeft: 10,
  },
  button: {
    paddingHorizontal: spaceRegular,
    marginTop: spaceSmall,
  },
  qrBackBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  QrResult: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spaceSmall,
  },
  qrResultText: {
    marginTop: superSmall,
  },
  qrBorderColor: {
    borderColor: darkRed,
  },
});
