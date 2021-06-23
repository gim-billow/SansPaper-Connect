import {StyleSheet} from 'react-native';
import {spaceRegular, spaceMedium} from 'styles/space';
import {red, white} from '@styles/colors';
import {questrial, regular} from '@styles/font';

export default StyleSheet.create({
  topContainer: {
    marginVertical: spaceMedium,
  },
  canvasContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sketch: {
    flex: 1,
    flexDirection: 'row',
    height: 500,
  },
  btnContainer: {
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  title: {
    fontFamily: questrial,
    letterSpacing: 0.5,
    fontSize: regular,
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginVertical: spaceRegular,
  },
  box: {
    height: 500,
  },
  canvasWrapper: {
    flexDirection: 'row',
  },
  disableText: {
    color: white,
  },
  disable: {
    backgroundColor: red,
  },
  image: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: 'transparent',
  },
});
