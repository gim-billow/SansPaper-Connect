import {StyleSheet} from 'react-native';

import {red} from '@styles/colors';
import {superSmall} from 'styles/space';
import {small, questrial} from '@styles/font';

export default StyleSheet.create({
  text: {
    paddingVertical: superSmall,
    fontSize: small,
    fontFamily: questrial,
    color: red,
  },
});
