import {StyleSheet} from 'react-native';
import {spaceLarge, spaceRegular} from 'styles/space';
import {questrial, white} from 'styles/font';

export default StyleSheet.create({
  textInput: {
    backgroundColor: white,
    fontFamily: questrial,
    letterSpacing: 0.2,
  },
  container: {
    flexDirection: 'row',
    marginTop: spaceRegular,
  },
  inputContainer: {
    flex: 1,
    marginRight: 20,
  },
  input: {
    paddingLeft: 0,
    paddingRight: 0,
  },
  topContainer: {
    marginVertical: spaceLarge,
  },
});
