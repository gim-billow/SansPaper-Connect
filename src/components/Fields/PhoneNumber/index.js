import React, {useRef} from 'react';
import {View, Text} from 'react-native';
import PhoneInput from 'react-native-phone-number-input';
import styles from './styles';
import ItemWrapper from '../ItemWrapper';

const PhoneNumber = (props) => {
  const {label, rank} = props.item;
  const phoneInput = useRef(null);

  const changePhoneNumber = (text) => {
    const {updateFieldsValue} = props;
    updateFieldsValue({rank: rank, value: text});
  };

  return (
    <ItemWrapper>
      <Text style={styles.text}>{label}</Text>
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
    </ItemWrapper>
  );
};

export default PhoneNumber;
