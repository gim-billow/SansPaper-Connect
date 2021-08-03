import React, {useRef} from 'react';
import {View, Text} from 'react-native';
import PhoneInput from 'react-native-phone-number-input';
import parsePhoneNumber from 'libphonenumber-js';

import MandatoryField from '../MandatoryField';
import {commonStyles} from '@styles/common';
import styles from './styles';

const PhoneNumber = (props) => {
  const {label, rank, mandatory, value} = props.item;
  const {isEditable, updateFieldsValue, draftFormHasChanges, draftId} = props;
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
    if (draftId) draftFormHasChanges(true);
    updateFieldsValue({rank: rank, value: text});
  };

  return (
    <>
      <View style={styles.topContainer}>
        <Text style={commonStyles.title}>{label}</Text>
        {mandatory === 1 ? (
          <MandatoryField />
        ) : (
          <View style={commonStyles.spacing} />
        )}
        <View style={styles.container}>
          <View style={styles.content}>
            {!isEditable && <View style={styles.disablePhoneNum} />}
            <PhoneInput
              ref={phoneInput}
              containerStyle={styles.phoneContainer}
              textContainerStyle={styles.phoneTextContainer}
              codeTextStyle={styles.phoneNumText}
              textInputStyle={styles.phoneNumText}
              defaultValue={phoneNumber}
              defaultCode={phoneCountry}
              layout="first"
              onChangeFormattedText={changePhoneNumber}
            />
          </View>
        </View>
      </View>
    </>
  );
};

export default PhoneNumber;
