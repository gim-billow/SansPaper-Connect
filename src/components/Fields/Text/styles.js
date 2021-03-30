import {StyleSheet} from 'react-native';
import {spaceRegular, spaceMedium} from 'styles/space';
import {red} from 'styles/colors';

export default StyleSheet.create({
  textInput: {
    backgroundColor: 'white',
    marginHorizontal: spaceRegular,
  },
  textInputWithIcon: {
    backgroundColor: 'white',
  },
  textContainer: {
    marginVertical: spaceMedium,
  },
  textInputMap: {
    flex: 1,
    marginLeft: spaceRegular,
    flexDirection: 'row',
  },
  inputWrapper: {
    flex: 1,
  },
  iconWrapper: {
    justifyContent: 'center',
  },
  map: {
    color: red,
    paddingHorizontal: spaceRegular,
  },
});
