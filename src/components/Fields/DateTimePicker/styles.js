import {StyleSheet} from 'react-native';
import {spaceSmall, spaceRegular, spaceMedium} from 'styles/space';
import {regular, small} from 'styles/font';
import {lightRed, darkRed} from '@styles/colors';

export default StyleSheet.create({
  topContainer: {
    marginVertical: spaceMedium,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    marginHorizontal: spaceRegular,
  },
  textSetWrapper: {
    flex: 1,
    paddingTop: spaceRegular,
  },
  textSet: {
    paddingLeft: spaceRegular,
    fontSize: 12,
    color: 'grey',
  },
  left: {
    marginRight: spaceSmall,
  },
  right: {
    marginLeft: spaceSmall,
  },
  button: {
    flex: 1,
  },
  SetDefault: {
    fontSize: regular,
    paddingTop: spaceRegular,
  },
  buttonColor: {
    backgroundColor: 'white',
  },
  ChangeButtonColor: {
    backgroundColor: darkRed,
  },
  TextColor: {
    color: lightRed,
  },
  ChangeTextColor: {
    color: 'white',
  },
});
