import {StyleSheet} from 'react-native';
import {spaceSmall, spaceMedium, spaceRegular, superSmall} from 'styles/space';
import {regular, medium} from 'styles/font';
import {lightRed, darkRed, red} from '@styles/colors';

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
  TextColor: {
    color: lightRed,
  },
  ChangeTextColor: {
    color: 'white',
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
  },
  button: {
    fontSize: regular,
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

  /**
   * Overlay styles
   */
  closeTxtOverlay: {
    color: red,
  },
  closeBtnOverlay: {
    width: 200,
    marginTop: 20,
    borderColor: red,
    paddingVertical: 7,
  },
  overlayBtn: {
    width: 200,
    backgroundColor: red,
    marginBottom: 10,
  },
  iconSpace: {
    padding: 10,
  },
  overlayHeaderText: {
    marginBottom: 20,
    alignItems: 'center',
  },
  overlayHeader: {
    alignItems: 'center',
  },
  backdrop: {
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  overlay: {
    borderRadius: 5,
    padding: 30,
  },
});
