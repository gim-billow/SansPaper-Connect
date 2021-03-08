import {StyleSheet} from 'react-native';
import {spaceSmall, spaceMedium, spaceRegular} from 'styles/space';
import {regular} from 'styles/font';

export default StyleSheet.create({
  text: {
    fontSize: regular,
    color: 'gray',
  },
  container: {
    flex: 1,
    paddingTop: spaceSmall,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
