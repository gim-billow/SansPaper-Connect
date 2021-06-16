import React, {useRef} from 'react';
import {View, Text} from 'react-native';
import PhoneInput from 'react-native-phone-number-input';
import {Divider} from 'react-native-elements';
import parsePhoneNumber from 'libphonenumber-js';

import MandatoryField from '../MandatoryField';
import {commonStyles} from '@styles/common';
import styles from './styles';
import ItemWrapper from '../ItemWrapper';

const PhoneNumber = (props) => {
  const {label, rank, mandatory, value} = props.item;
  const {isEditable, updateFieldsValue} = props;
  const phoneInput = useRef(null);
  let phoneNumber = '';
  let phoneCountry = 'AU';

  const parsedPhoneNum = parsePhoneNumber(value);
  // if national number is avail
  if (parsedPhoneNum && parsedPhoneNum.nationalNumber) {
    phoneNumber = parsedPhoneNum.nationalNumber;
  }
  // if country is avail
  if (parsedPhoneNum && parsedPhoneNum.country) {
    phoneCountry = parsedPhoneNum.country;
  }

  const changePhoneNumber = (text) => {
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
              disabled={!isEditable}
              ref={phoneInput}
              defaultValue={phoneNumber}
              defaultCode={phoneCountry}
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
