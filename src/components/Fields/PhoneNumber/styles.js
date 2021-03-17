import {StyleSheet} from 'react-native';
import {superSmall, spaceMedium} from 'styles/space';
import {lightGrey} from 'styles/colors';

export default StyleSheet.create({
  topContainer: {
    marginVertical: spaceMedium,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    borderWidth: 1,
    borderColor: lightGrey,
    borderRadius: 2,
    marginTop: superSmall,
  },
});
