import {StyleSheet} from 'react-native';
import {spaceSmall, spaceMedium, spaceRegular} from 'styles/space';
import {regular} from 'styles/font';
import {lightRed, darkRed, white} from '@styles/colors';

export default StyleSheet.create({
  text: {
    paddingLeft: spaceMedium,
    fontSize: regular,
    color: 'gray',
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: spaceMedium,
    paddingLeft: spaceMedium,
    alignItems: 'center',
  },
  button: {
    borderWidth: 1,
    borderColor: darkRed,
    width: '100%',
  },
  icon: {
    color: 'green',
  },
});
