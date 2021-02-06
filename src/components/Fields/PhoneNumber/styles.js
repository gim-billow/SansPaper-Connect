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
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    paddingTop: spaceSmall,
    paddingLeft: spaceSmall,
    paddingRight: spaceSmall,
    paddingBottom: spaceSmall,
  },
  content: {
    flex: 0.5,
    borderWidth: 1,
    borderColor: 'grey',
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
    borderBottomLeftRadius: 2,
    borderBottomRightRadius: 2,
  },
});
