import {StyleSheet} from 'react-native';

import {darkRed} from '@styles/colors';
import {superSmall} from 'styles/space';
import {small, questrial} from '@styles/font';

export default StyleSheet.create({
  topContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 3,
  },
  text: {
    paddingVertical: superSmall,
    fontSize: small,
    fontFamily: questrial,
    color: darkRed,
  },
});
