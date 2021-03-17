import {StyleSheet} from 'react-native';
import {regular, medium} from 'styles/font';
import {red, veryLightGrey, white, darkRed} from '@styles/colors';
import {spaceSmall} from 'styles/space';
import {spaceRegular, superSmall} from '@styles/space';

export default StyleSheet.create({
  topContainer: {
    flex: 1,
    paddingVertical: spaceRegular,
  },
  itemText: {
    fontSize: regular,
    paddingVertical: superSmall,
  },
  container: {
    position: 'absolute',
    flex: 1,
    left: 0,
    right: 0,
    top: 100,
    bottom: 100,
  },
  selectToggle: {
    marginTop: superSmall,
    marginHorizontal: spaceRegular,
    paddingHorizontal: spaceSmall,
    paddingVertical: spaceRegular,
    borderRadius: 10,
    backgroundColor: veryLightGrey,
  },
  button: {
    backgroundColor: red,
  },
  qrButton: {
    fontSize: regular,
    marginTop: spaceRegular,
    padding: spaceRegular,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  qrArea: {
    backgroundColor: 'black',
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
  qrBackBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginTop: spaceRegular,
    marginLeft: spaceRegular,
    fontSize: 30,
  },
  modalText: {
    marginTop: 15,
    marginLeft: spaceRegular,
    textAlign: 'left',
    fontSize: medium,
    color: white,
  },
  qrBorderColor: {
    borderColor: darkRed,
  },
});
