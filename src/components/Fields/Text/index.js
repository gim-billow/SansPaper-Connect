import React, {useEffect, useState, memo} from 'react';
import {TextInput, Divider} from 'react-native-paper';
import {Text, View} from 'react-native';

import styles from './styles';
import ItemWrapper from '../ItemWrapper';
import MandatoryField from '../MandatoryField';
import {commonStyles} from '@styles/common';

const SPText = (props) => {
  const {type, label, rank, value, mandatory} = props.item;
  const {updateFieldsValue} = props;
  const [text, setText] = useState('');

  useEffect(() => {
    setText(value);
  }, [value]);

  const onChangeText = (updatedText) => {
    setText(updatedText);
    updateFieldsValue({rank, value: updatedText});
  };

  const keyboard = (types) => {
    switch (types) {
      case 'decimal':
        return 'decimal-pad';
      case 'numeric':
        return 'numeric';
      case 'email':
        return 'email-address';
      default:
        return 'default';
    }
  };

  return (
    <ItemWrapper>
      <View style={styles.textContainer}>
        <Text style={commonStyles.text}>{label}</Text>
        {mandatory === 1 ? (
          <MandatoryField />
        ) : (
          <View style={commonStyles.spacing} />
        )}
        <TextInput
          style={styles.textInput}
          value={text}
          label="Insert here"
          mode="outlined"
          keyboardType={keyboard(type)}
          multiline={type !== 'text' ? true : false}
          onChangeText={(updatedText) => onChangeText(updatedText)}
        />
      </View>
      <Divider />
    </ItemWrapper>
  );
};

const areEqual = (prevProps, nextProps) => {
  if (prevProps.item.value === nextProps.item.value) {
    return true;
  }
  return false;
};

export default memo(SPText, areEqual);
