import {StyleSheet} from 'react-native';
import {regular, questrial} from 'styles/font';
import {red, veryLightGrey, darkGrey, lightGrey} from '@styles/colors';
import {spaceLarge, superSmall, spaceSmall} from '@styles/space';

export default StyleSheet.create({
  topContainer: {
    marginVertical: spaceLarge,
  },
  itemText: {
    fontSize: regular,
    fontFamily: questrial,
    letterSpacing: 0.2,
    paddingVertical: superSmall,
  },
  container: {
    position: 'absolute',
    flex: 1,
    left: 0,
    right: 0,
    top: 100,
    bottom: 100,
    borderRadius: 15,
  },
  selectToggle: {
    marginTop: superSmall,
    paddingHorizontal: spaceSmall,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: lightGrey,
  },
  button: {
    backgroundColor: red,
  },
  searchBar: {
    backgroundColor: veryLightGrey,
  },
  selectToggleText: {
    fontFamily: questrial,
    color: darkGrey,
  },
  confirmText: {
    fontFamily: questrial,
    fontSize: 16,
    letterSpacing: 0.2,
    paddingVertical: 5,
  },
});
