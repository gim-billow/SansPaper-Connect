import {StyleSheet} from 'react-native';
import {spaceSmall, spaceMedium, spaceRegular} from 'styles/space';
import {regular} from 'styles/font';
import {lightRed, darkRed, white} from '@styles/colors';

export default StyleSheet.create({
  text: {
    fontSize: regular,
    color: 'gray',
    paddingTop: spaceSmall,
    paddingLeft: 50,
    paddingRight: spaceMedium,
  },
  button: {
    borderWidth: 1,
    borderColor: darkRed,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: spaceMedium,
    paddingLeft: 40,
  },
});
