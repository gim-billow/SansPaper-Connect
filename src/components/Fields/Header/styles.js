import {StyleSheet} from 'react-native';
import {medium, questrial} from '@styles/font';
import {spaceLarge} from '@styles/space';
import {red, white} from '@styles/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: spaceLarge,
  },
  textView: {
    backgroundColor: red,
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  text: {
    fontSize: medium,
    fontFamily: questrial,
    letterSpacing: 0.5,
    color: white,
  },
  divider: {
    flex: 1,
    borderWidth: 0.5,
    borderColor: red,
  },
});
