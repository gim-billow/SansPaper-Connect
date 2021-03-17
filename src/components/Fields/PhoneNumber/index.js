import React, {useRef} from 'react';
import {View, Text} from 'react-native';
import PhoneInput from 'react-native-phone-number-input';
import {Divider} from 'react-native-elements';

import MandatoryField from '../MandatoryField';
import {commonStyles} from '@styles/common';
import styles from './styles';
import ItemWrapper from '../ItemWrapper';

const PhoneNumber = (props) => {
  const {label, rank, mandatory} = props.item;
  const phoneInput = useRef(null);

  const changePhoneNumber = (text) => {
    const {updateFieldsValue} = props;
    updateFieldsValue({rank: rank, value: text});
  };

  return (
    <ItemWrapper>
      <View style={styles.topContainer}>
        <Text style={commonStyles.text}>{label}</Text>
        {mandatory === 1 ? (
          <MandatoryField />
        ) : (
          <View style={commonStyles.spacing} />
        )}
        <View style={styles.container}>
          <View style={styles.content}>
            <PhoneInput
              ref={phoneInput}
              defaultCode="AU"
              layout="first"
              onChangeFormattedText={changePhoneNumber}
            />
          </View>
        </View>
      </View>
      <Divider />
    </ItemWrapper>
  );
};

export default PhoneNumber;
