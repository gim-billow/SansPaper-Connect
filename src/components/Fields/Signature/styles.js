import {StyleSheet} from 'react-native';

import {spaceSmall, superSmall, spaceMedium, spaceRegular} from '@styles/space';
import {questrial, regular} from '@styles/font';
import {white, red, lightGrey} from '@styles/colors';

export default StyleSheet.create({
  dimmedSingature: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: 'transparent',
  },
  topContainer: {
    marginVertical: spaceMedium,
  },
  container: {
    marginTop: spaceRegular,
  },
  signView: {
    borderWidth: 1.5,
    borderRadius: 5,
    borderColor: lightGrey,
    borderStyle: 'dashed',
    marginBottom: 10,
  },
  droidSignature: {
    flex: 1,
    height: 200,
  },
  signature: {
    height: 200,
    marginBottom: 10,
  },
  disableText: {
    color: white,
  },
  disable: {
    backgroundColor: red,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    marginTop: spaceSmall,
  },
  leftButton: {
    flex: 1,
    marginRight: superSmall,
  },
  rightButton: {
    flex: 1,
    marginLeft: superSmall,
  },
  title: {
    fontFamily: questrial,
    letterSpacing: 0.5,
    fontSize: regular,
  },
  btnContainer: {
    borderRadius: 10,
  },
});
