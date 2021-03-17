import {StyleSheet} from 'react-native';
import {regular} from 'styles/font';
import {red, veryLightGrey} from '@styles/colors';
import {spaceMedium, spaceRegular, superSmall, spaceSmall} from '@styles/space';

export default StyleSheet.create({
  topContainer: {
    marginVertical: spaceMedium,
  },
  itemText: {
    fontSize: regular,
    paddingVertical: superSmall,
  },
  container: {
    position: 'absolute',
    flex: 1,
    left: 0,
    right: 0,
    top: 100,
    bottom: 100,
  },
  selectToggle: {
    marginTop: superSmall,
    marginHorizontal: spaceRegular,
    paddingHorizontal: spaceSmall,
    paddingVertical: spaceRegular,
    borderRadius: 10,
    backgroundColor: veryLightGrey,
  },
  button: {
    backgroundColor: red,
  },
});
