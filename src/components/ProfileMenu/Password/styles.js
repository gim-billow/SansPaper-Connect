import {StyleSheet} from 'react-native';
import {spaceSmall, spaceMedium, spaceRegular} from 'styles/space';
import {regular} from 'styles/font';
import {lightRed, darkRed, white} from '@styles/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: spaceMedium,
    paddingLeft: spaceMedium,
    paddingRight: spaceMedium,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    borderWidth: 1,
    borderColor: darkRed,
    width: '100%',
  },
});
