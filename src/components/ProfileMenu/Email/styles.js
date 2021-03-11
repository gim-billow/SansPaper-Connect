import {StyleSheet} from 'react-native';
import {spaceSmall, spaceMedium, spaceRegular} from 'styles/space';
import {regular} from 'styles/font';

export default StyleSheet.create({
  text: {
    fontSize: regular,
    color: 'gray',
  },
  textView: {
    paddingLeft: spaceRegular,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: spaceMedium,
    paddingLeft: spaceMedium,
    alignItems: 'center',
  },
});
