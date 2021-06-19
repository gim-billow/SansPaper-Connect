import {StyleSheet} from 'react-native';
import {white, red} from '@styles/colors';
import {questrial, regular, large} from '@styles/font';

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
    marginLeft: 30,
  },
  header: {
    backgroundColor: red,
    justifyContent: 'center',
    height: 122,
    paddingHorizontal: 30,
  },
  headerText: {
    fontSize: large,
    color: white,
    fontFamily: questrial,
    letterSpacing: 0.5,
  },
  tabBar: {
    backgroundColor: red,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
});
