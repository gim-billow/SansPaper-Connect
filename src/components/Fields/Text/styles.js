import {StyleSheet} from 'react-native';
import {spaceRegular, spaceMedium} from 'styles/space';
import {red, white, darkGrey} from 'styles/colors';
import {questrial, regular} from '@styles/font';

export default StyleSheet.create({
  textInput: {
    backgroundColor: white,
    fontFamily: questrial,
    fontSize: regular,
    letterSpacing: 0.2,
    color: darkGrey,
  },
  input: {
    paddingLeft: 0,
    paddingRight: 0,
  },
  textContainer: {
    marginVertical: spaceMedium,
  },
  textInputMap: {
    flex: 1,
    flexDirection: 'row',
  },
  inputWrapper: {
    flex: 1,
  },
  iconWrapper: {
    justifyContent: 'center',
  },
  map: {
    color: red,
    paddingHorizontal: spaceRegular,
  },
});
