import React, {useEffect, useState, memo} from 'react';
import {TextInput} from 'react-native-paper';
import {Divider} from 'react-native-elements';
import {Text, View, Platform} from 'react-native';

import styles from './styles';
import ItemWrapper from '../ItemWrapper';
import MandatoryField from '../MandatoryField';
import {commonStyles} from '@styles/common';

const SPText = (props) => {
  const {type, label, rank, value, mandatory} = props.item;
  const {updateFieldsValue} = props;
  const [text, setText] = useState('');
  const [selection, setSelection] = useState(
    Platform.OS === 'android' ? {start: 0} : null,
  );

  useEffect(() => {
    setText(value);
  }, [value]);

  const onChangeText = (updatedText) => {
    setText(updatedText);
    updateFieldsValue({rank, value: updatedText});
  };

  const onInputFocus = () => {
    if (Platform.OS === 'android') {
      setSelection(null);
    }
  };

  const onBlurInput = () => {
    if (Platform.OS === 'android') {
      setSelection({start: 0});
    }
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
          onFocus={onInputFocus}
          onBlur={onBlurInput}
          style={styles.textInput}
          value={text}
          label="Insert here"
          mode="outlined"
          selection={selection}
          keyboardType={keyboard(type)}
          multiline={type === 'textarea' ? true : false}
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
