import {StyleSheet} from 'react-native';
import {spaceSmall, spaceMedium} from 'styles/space';
import {regular} from 'styles/font';
import {lightRed, white} from '@styles/colors';

export default StyleSheet.create({
  button: {
    fontSize: regular,
    paddingTop: spaceSmall,
    paddingLeft: spaceSmall,
    paddingRight: spaceSmall,
    paddingBottom: spaceSmall,
  },
  label: {
    fontSize: regular,
    paddingTop: spaceSmall,
    paddingLeft: spaceSmall,
    paddingRight: spaceMedium,
    paddingBottom: spaceSmall,
  },
  text: {
    color: lightRed,
    fontSize: regular,
  },
  buttonColor: {
    backgroundColor: white,
  },
});
