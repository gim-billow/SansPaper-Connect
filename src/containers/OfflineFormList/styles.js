import {StyleSheet} from 'react-native';
import {lightGrey} from '@styles/colors';

export default StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  flex1: {
    flex: 1,
  },
  searchbar: {
    marginBottom: 20,
  },
  emptyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  downloadButton: {
    width: 50,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 0.5,
    borderColor: lightGrey,
  },
});
