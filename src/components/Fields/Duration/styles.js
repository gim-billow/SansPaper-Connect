import {StyleSheet} from 'react-native';
import {spaceSmall, spaceMedium, spaceRegular} from 'styles/space';
import {regular} from 'styles/font';

export default StyleSheet.create({
  text: {
    fontSize: regular,
    paddingTop: spaceSmall,
    paddingLeft: spaceSmall,
    paddingRight: spaceMedium,
  },
  textInput: {
    backgroundColor: 'white',
    margin: spaceRegular,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  content: {
    width: '50%',
  },
});