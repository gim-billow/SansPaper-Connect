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
  titleView: {
    flex: 1,
    marginRight: 20,
    marginLeft: 10,
  },
  title: {
    fontFamily: questrial,
    fontSize: regular,
    letterSpacing: 0.2,
    color: darkGrey,
  },
  emptyContainer: {
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 50,
  },
  emptyText: {
    fontFamily: questrial,
    fontSize: regular,
    letterSpacing: 0.2,
    color: darkGrey,
    textAlign: 'center',
  },
});
