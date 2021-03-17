import {StyleSheet} from 'react-native';
import {regular} from '@styles/font';
import {spaceSmall, superSmall, spaceMedium} from '@styles/space';
import {red, darkGrey, white} from '@styles/colors';

export default StyleSheet.create({
  topContainer: {
    marginVertical: spaceMedium,
  },
  container: {
    marginHorizontal: spaceSmall + 4,
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  text: {
    fontSize: regular,
    padding: spaceSmall,
  },
  redButton: {
    borderWidth: 1,
    flexBasis: 150,
    borderRadius: 5,
    borderColor: red,
    justifyContent: 'center',
    alignItems: 'center',
    margin: superSmall,
  },
  greenButton: {
    borderWidth: 1,
    flexBasis: 150,
    borderRadius: 5,
    borderColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
    margin: superSmall,
  },
  orangeButton: {
    borderWidth: 1,
    flexBasis: 150,
    borderRadius: 5,
    borderColor: 'orange',
    justifyContent: 'center',
    alignItems: 'center',
    margin: superSmall,
  },
  blueButton: {
    borderWidth: 1,
    flexBasis: 150,
    borderRadius: 5,
    borderColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    margin: superSmall,
  },
  redBackground: {
    backgroundColor: red,
    borderColor: red,
    borderWidth: 1,
  },
  whiteBackground: {
    backgroundColor: white,
    borderColor: darkGrey,
    borderWidth: 1,
  },
  greenBackground: {
    backgroundColor: 'green',
    borderColor: 'green',
    borderWidth: 1,
  },
  orangeBackground: {
    backgroundColor: 'orange',
    borderColor: 'orange',
    borderWidth: 1,
  },
  blueBackground: {
    backgroundColor: 'blue',
    borderColor: 'blue',
    borderWidth: 1,
  },
  redColor: {
    color: darkGrey,
  },
  whiteColor: {
    color: 'white',
  },
  greenColor: {
    color: darkGrey,
  },
  orangeColor: {
    color: darkGrey,
  },
  blueColor: {
    color: darkGrey,
  },
});
