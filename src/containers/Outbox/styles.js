import {StyleSheet} from 'react-native';
import {green, darkGrey, purple, red, white} from '@styles/colors';
import {questrial, regular, large, roboto} from '@styles/font';
import {small} from '../../styles/font';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: red,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  headerText: {
    fontSize: large,
    color: white,
    fontFamily: questrial,
    letterSpacing: 0.5,
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
    fontFamily: roboto,
    fontSize: regular,
    letterSpacing: 0.2,
    marginBottom: 2,
  },
  title2: {
    fontFamily: questrial,
    fontSize: regular - 2,
    letterSpacing: 0.2,
    marginBottom: 5,
    color: purple,
  },
  subTitle1: {
    fontFamily: questrial,
    fontSize: small,
    color: green,
    letterSpacing: 0.2,
  },
  subTitle2: {
    fontFamily: questrial,
    fontSize: small,
    color: darkGrey,
    letterSpacing: 0.2,
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
  draft: {
    color: darkGrey,
    fontSize: small,
    fontFamily: questrial,
    letterSpacing: 0.2,
  },
  status: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 20,
  },
  submitted: {
    color: green,
    fontSize: small,
    fontFamily: questrial,
    letterSpacing: 0.2,
  },
  filter: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 20,
    paddingTop: 15,
    paddingBottom: 12,
  },
  filterView: {
    flexDirection: 'row',
    backgroundColor: red,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  filterText: {
    paddingLeft: 10,
    letterSpacing: 0.2,
    fontFamily: questrial,
    fontSize: regular,
    color: white,
  },
  itemView: {
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 12,
  },
  itemText: {
    color: white,
    fontSize: regular,
    fontFamily: questrial,
    letterSpacing: 0.2,
  },
});
