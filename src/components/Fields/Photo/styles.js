import {StyleSheet, Dimensions} from 'react-native';
import {spaceMedium, spaceRegular, superSmall, spaceSmall} from 'styles/space';
import {regular, questrial, medium} from 'styles/font';
import {white, red, darkGrey} from '@styles/colors';

const width = Dimensions.get('screen').width;

export default StyleSheet.create({
  topContainer: {
    marginVertical: spaceMedium,
  },
  button: {
    marginTop: spaceSmall,
  },
  title: {
    fontFamily: questrial,
    letterSpacing: 0.5,
    fontSize: regular,
  },
  btnContainer: {
    borderRadius: 10,
    paddingVertical: 10,
    width: width / 2,
  },
  disableText: {
    color: white,
  },
  disable: {
    backgroundColor: red,
  },
  Thumbnail: {
    flex: 1,
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
    // color: red,
    fontFamily: questrial,
    fontSize: regular,
    letterSpacing: 0.2,
  },
  closeBtnOverlay: {
    width: 200,
    borderRadius: 5,
  },
  closeContainer: {
    marginVertical: 10,
  },
  overlayBtn: {
    width: 200,
    backgroundColor: red,
    borderRadius: 5,
    marginBottom: 5,
  },
  iconSpace: {
    paddingRight: 10,
  },
  overlayText: {
    fontFamily: questrial,
    fontSize: regular,
    paddingVertical: 5,
    letterSpacing: 0.2,
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
    borderRadius: 20,
    padding: 30,
  },
  photoText: {
    fontFamily: questrial,
    fontSize: medium,
    letterSpacing: 0.2,
  },
  subPhotoText: {
    fontFamily: questrial,
    fontSize: regular,
    letterSpacing: 0.2,
    color: darkGrey,
  },
});
