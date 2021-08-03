import {StyleSheet} from 'react-native';
import {superSmall, spaceMedium, spaceRegular} from 'styles/space';
import {lightGrey} from 'styles/colors';
import {questrial, regular} from '@styles/font';

export default StyleSheet.create({
  topContainer: {
    marginVertical: spaceMedium,
  },
  container: {
    marginTop: spaceRegular,
  },
  content: {
    borderWidth: 1,
    borderColor: lightGrey,
    borderRadius: 15,
    marginTop: superSmall,
  },
  phoneNumText: {
    fontFamily: questrial,
    letterSpacing: 0.2,
    fontSize: regular,
  },
  phoneContainer: {
    borderRadius: 15,
    width: 'auto',
  },
  phoneTextContainer: {
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
  },
  disablePhoneNum: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    zIndex: 100,
  },
});
