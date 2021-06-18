import {StyleSheet} from 'react-native';
import {white} from '@styles/colors';
import {questrial, regular} from '@styles/font';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: white,
  },
  logo: {
    width: '60%',
    marginBottom: 20,
  },
  tabText: {
    fontFamily: questrial,
    fontSize: regular,
    letterSpacing: 0.2,
  },
  tab: {
    width: 'auto',
    marginLeft: 15,
  },
});
