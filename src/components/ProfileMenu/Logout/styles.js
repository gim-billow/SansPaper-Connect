import {StyleSheet} from 'react-native';
import {spaceSmall, spaceMedium, spaceRegular} from 'styles/space';
import {regular} from '@styles/font';
import {lightRed, darkRed, white} from '@styles/colors';

export default StyleSheet.create({
  text: {
    fontSize: regular,
    paddingLeft: spaceRegular,
    paddingRight: spaceMedium,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    paddingLeft: spaceMedium,
    paddingRight: spaceMedium,
    alignItems: 'center',
  },
  button: {
    borderWidth: 1,
    borderColor: darkRed,
    width: '100%',
  },
});
