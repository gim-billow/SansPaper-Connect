import {StyleSheet} from 'react-native';

import {red} from '@styles/colors';
import {spaceRegular, superSmall} from 'styles/space';
import {small} from '@styles/font';

export default StyleSheet.create({
  text: {
    paddingVertical: superSmall,
    paddingLeft: spaceRegular,
    fontSize: small,
    textAlign: 'left',
    color: red,
  },
});
