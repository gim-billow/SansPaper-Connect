import {StyleSheet} from 'react-native';
import {regular, questrial} from '@styles/font';
import {spaceSmall, superSmall, spaceLarge, spaceRegular} from '@styles/space';
import {red, white, lightGrey, darkGrey} from '@styles/colors';

export default StyleSheet.create({
  btn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  topContainer: {
    marginVertical: spaceLarge,
  },
  container: {
    flexDirection: 'row',
    marginTop: spaceRegular,
    flexWrap: 'wrap',
  },
  text: {
    fontSize: regular,
    fontFamily: questrial,
    letterSpacing: 0.2,
    paddingVertical: spaceSmall,
    paddingLeft: superSmall,
  },
  selectedText: {
    fontSize: regular,
    fontFamily: questrial,
    letterSpacing: 0.2,
    paddingVertical: spaceSmall,
  },
  redButton: {
    borderWidth: 1,
    flexBasis: 150,
    borderRadius: 10,
    borderColor: lightGrey,
    justifyContent: 'center',
    alignItems: 'center',
    margin: superSmall,
  },
  greenButton: {
    borderWidth: 1,
    flexBasis: 150,
    borderRadius: 10,
    borderColor: lightGrey,
    justifyContent: 'center',
    alignItems: 'center',
    margin: superSmall,
  },
  orangeButton: {
    borderWidth: 1,
    flexBasis: 150,
    borderRadius: 10,
    borderColor: lightGrey,
    justifyContent: 'center',
    alignItems: 'center',
    margin: superSmall,
  },
  blueButton: {
    borderWidth: 1,
    flexBasis: 150,
    borderRadius: 10,
    borderColor: lightGrey,
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
    // backgroundColor: white,
    // borderColor: darkGrey,
    // borderWidth: 1,
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
    color: white,
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
