import {StyleSheet} from 'react-native';
import {spaceSmall, spaceMedium, spaceRegular, superSmall} from 'styles/space';
import {regular, medium} from 'styles/font';
import {lightRed, darkRed} from '@styles/colors';

export default StyleSheet.create({
  topContainer: {
    marginVertical: spaceMedium,
  },
  buttonColor: {
    backgroundColor: 'white',
  },
  ChangeButtonColor: {
    backgroundColor: darkRed,
  },
  buttonMargin: {
    paddingBottom: 15,
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
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    shadowColor: '#000',
    width: 300,
    height: 255,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
  },
  modalText: {
    marginBottom: spaceSmall,
    textAlign: 'left',
    fontSize: medium + 4,
  },
  button: {
    fontSize: regular,
    // padding: spaceSmall,
    // paddingTop: spaceSmall,
    // width: '100%',
    marginHorizontal: spaceRegular,
  },
  Thumbnail: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  thumbnailStyle: {
    marginVertical: spaceRegular,
    backgroundColor: 'white',
    height: 200,
    width: '90%',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
  },
  noThumbNailSpace: {
    paddingVertical: superSmall,
  },
});
