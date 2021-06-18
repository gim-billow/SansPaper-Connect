import {StyleSheet} from 'react-native';
import {darkGrey} from '@styles/colors';
import {questrial, regular} from '@styles/font';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  cardView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  downloadButton: {
    paddingLeft: 5,
  },
  titleView: {
    flex: 1,
    marginRight: 20,
  },
  title: {
    fontFamily: questrial,
    fontSize: regular,
    letterSpacing: 0.2,
    color: darkGrey,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  emptyContainer: {
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontFamily: questrial,
    fontSize: regular,
    letterSpacing: 0.2,
    color: darkGrey,
  },
});
