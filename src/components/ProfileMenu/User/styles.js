import {StyleSheet} from 'react-native';
import {spaceSmall, spaceMedium, spaceRegular} from 'styles/space';
import {regular} from 'styles/font';

export default StyleSheet.create({
  text: {
    fontSize: regular,
    color: 'gray',
    paddingTop: spaceSmall,
    paddingLeft: 50,
    paddingRight: spaceMedium,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: 60,
    paddingLeft: 40,
  },
  icon: {
    color: 'gray',
  },
});
