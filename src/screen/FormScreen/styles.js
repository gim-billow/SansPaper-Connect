import {StyleSheet} from 'react-native';
import {white, red} from '@styles/colors';
import {questrial, regular, large} from '@styles/font';

export default StyleSheet.create({
  container: {
    flex: 1,
    // padding: 10,
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
  header: {
    backgroundColor: red,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingBottom: 5,
  },
  subHeader: {
    backgroundColor: red,
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 15,
  },
  subHederText: {
    color: white,
    fontSize: regular,
    fontFamily: questrial,
    letterSpacing: 0.2,
    paddingLeft: 5,
  },
  headerText: {
    fontSize: large,
    color: white,
    fontFamily: questrial,
    letterSpacing: 0.5,
  },
  tabBar: {
    backgroundColor: red,
  },
});
