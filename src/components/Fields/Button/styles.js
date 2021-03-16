import {StyleSheet} from 'react-native';
import {spaceMedium, spaceRegular} from 'styles/space';
import {regular} from 'styles/font';
import {lightRed, white} from '@styles/colors';

export default StyleSheet.create({
  container: {
    marginVertical: spaceMedium,
  },
  button: {
    fontSize: regular,
    paddingHorizontal: spaceRegular,
    paddingTop: spaceRegular,
  },
  text: {
    color: lightRed,
    fontSize: regular,
  },
  buttonColor: {
    backgroundColor: white,
  },
});
