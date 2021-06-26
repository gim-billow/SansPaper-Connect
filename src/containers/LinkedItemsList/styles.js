import {StyleSheet} from 'react-native';
import {regular, medium, questrial} from 'styles/font';
import {red, veryLightGrey, white, darkRed, darkGrey} from '@styles/colors';
import {spaceSmall} from 'styles/space';
import {spaceRegular, superSmall} from '@styles/space';

export default StyleSheet.create({
  topContainer: {
    flex: 1,
  },
  subjectHeader: {
    backgroundColor: red,
    // height: 170,
    // borderBottomLeftRadius: 25,
    // borderBottomRightRadius: 25,
    justifyContent: 'center',
    paddingHorizontal: 30,
    paddingVertical: 30,
  },
  headerText: {
    fontFamily: questrial,
    fontSize: regular,
    color: white,
    letterSpacing: 0.1,
  },
  selectView: {
    marginTop: 30,
    marginHorizontal: 10,
  },

  itemText: {
    fontSize: regular,
    fontFamily: questrial,
    letterSpacing: 0.2,
    paddingVertical: superSmall,
  },
  container: {
    position: 'absolute',
    flex: 1,
    left: 0,
    right: 0,
    top: 100,
    bottom: 100,
    borderRadius: 15,
  },
  selectToggle: {
    marginTop: superSmall,
    marginHorizontal: spaceRegular,
    paddingHorizontal: spaceSmall,
    paddingVertical: 12,
    borderRadius: 15,
    backgroundColor: veryLightGrey,
  },
  button: {
    backgroundColor: red,
  },
  qrView: {
    marginHorizontal: 30,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 100,
  },
  qrButton: {
    backgroundColor: red,
    borderRadius: 15,
  },
  qrText: {
    fontFamily: questrial,
    fontSize: regular,
    letterSpacing: 0.2,
    marginLeft: 10,
    paddingVertical: 10,
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
    fontFamily: questrial,
    color: white,
  },
  qrBorderColor: {
    borderColor: darkRed,
  },
  selectToggleText: {
    fontFamily: questrial,
    color: darkGrey,
  },
  searchBar: {
    backgroundColor: veryLightGrey,
  },
  confirmText: {
    fontFamily: questrial,
    fontSize: 16,
    letterSpacing: 0.2,
    paddingVertical: 5,
  },
});
