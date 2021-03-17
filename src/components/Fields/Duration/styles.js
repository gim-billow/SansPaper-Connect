import {StyleSheet} from 'react-native';
import {spaceSmall, spaceMedium, spaceRegular} from 'styles/space';

export default StyleSheet.create({
  textInput: {
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    marginHorizontal: spaceRegular,
  },
  content: {
    flex: 1,
  },
  left: {
    marginRight: spaceSmall,
  },
  right: {
    marginLeft: spaceSmall,
  },
  topContainer: {
    marginVertical: spaceMedium,
  },
});
