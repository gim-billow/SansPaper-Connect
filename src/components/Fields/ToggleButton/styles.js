import {StyleSheet} from 'react-native';
import {medium, regular} from '@styles/font';
import {spaceSmall} from '@styles/space';
import {lightGrey, red} from '@styles/colors';

export default StyleSheet.create({
  container: {
    padding: spaceSmall,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: medium,
  },
  label: {
    paddingLeft: spaceSmall,
    paddingTop: spaceSmall,
    color: lightGrey,
    fontSize: regular,
  },
  redButton: {
    borderWidth: 1,
    flex: 1,
    height: 40,
    borderRadius: 5,
    borderColor: red,
    justifyContent: 'center',
    alignItems: 'center',
  },
  greenButton: {
    borderWidth: 1,
    flex: 1,
    height: 40,
    borderRadius: 5,
    borderColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
  },
  orangeButton: {
    borderWidth: 1,
    flex: 1,
    height: 40,
    borderRadius: 5,
    borderColor: 'orange',
    justifyContent: 'center',
    alignItems: 'center',
  },
  blueButton: {
    borderWidth: 1,
    flex: 1,
    height: 40,
    borderRadius: 5,
    borderColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
  },
  redBackground: {
    backgroundColor: red,
  },
  whiteBackground: {
    backgroundColor: 'white',
  },
  greenBackground: {
    backgroundColor: 'green',
  },
  orangeBackground: {
    backgroundColor: 'orange',
  },
  blueBackground: {
    backgroundColor: 'blue',
  },
  redColor: {
    color: red,
  },
  whiteColor: {
    color: 'white',
  },
  greenColor: {
    color: 'green',
  },
  orangeColor: {
    color: 'orange',
  },
  blueColor: {
    color: 'blue',
  },
});
