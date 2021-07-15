import React, {useEffect, useState, memo} from 'react';
import {Input} from 'react-native-elements';
import {Text, View, Platform, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import styles from './styles';
import MandatoryField from '../MandatoryField';
import {commonStyles} from '@styles/common';
import {darkGrey, lightGrey, red} from '@styles/colors';
import {hasLocationPermission} from '@store/forms';

const SPText = (props) => {
  const {type, label, rank, value, mandatory} = props.item;
  const {updateFieldsValue, goToGoogleMapScreen, isEditable} = props;
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

  const onUpdateMapAddress = (address) => {
    setText(address);
    updateFieldsValue({rank, value: address});
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

  const enableLocation = async () => {
    const permission = await hasLocationPermission();

    if (permission) {
      goToGoogleMapScreen({
        setText: (address) => onUpdateMapAddress(address),
        address: text,
      });
    }
  };

  if (
    label.toLowerCase().includes('geo') ||
    label.toLowerCase().includes('location') ||
    label.toLowerCase().includes('address')
  ) {
    return (
      <>
        <View style={styles.textContainer}>
          <Text style={commonStyles.title}>{label}</Text>
          {mandatory === 1 ? (
            <MandatoryField />
          ) : (
            <View style={commonStyles.spacing} />
          )}
          <View style={styles.textInputMap}>
            <View style={styles.inputWrapper}>
              <Input
                disabled={!isEditable}
                onFocus={onInputFocus}
                onBlur={onBlurInput}
                inputStyle={styles.textInput}
                value={text}
                placeholder="Insert here"
                placeholderTextColor={lightGrey}
                containerStyle={styles.input}
                selectionColor={darkGrey}
                selection={selection}
                keyboardType={keyboard(type)}
                multiline={type === 'textarea' ? true : false}
                onChangeText={(updatedText) => onChangeText(updatedText)}
              />
            </View>
            {props.isInternetReachable ? (
              <TouchableOpacity
                disabled={!isEditable}
                style={styles.iconWrapper}
                onPress={enableLocation}>
                <Icon color={red} size={40} style={styles.map} name="place" />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                disabled={true}
                style={styles.iconWrapper}
                onPress={enableLocation}>
                <Icon
                  color={darkGrey}
                  size={40}
                  style={styles.map}
                  name="location-off"
                />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </>
    );
  }

  return (
    <>
      <View style={styles.textContainer}>
        <Text style={commonStyles.title}>{label}</Text>
        {mandatory === 1 ? (
          <MandatoryField />
        ) : (
          <View style={commonStyles.spacing} />
        )}
        <Input
          disabled={!isEditable}
          onFocus={onInputFocus}
          onBlur={onBlurInput}
          inputStyle={styles.textInput}
          value={text}
          containerStyle={styles.input}
          placeholder="Insert here"
          placeholderTextColor={lightGrey}
          selectionColor={darkGrey}
          selection={selection}
          keyboardType={keyboard(type)}
          multiline={type === 'textarea' ? true : false}
          onChangeText={(updatedText) => onChangeText(updatedText)}
        />
      </View>
    </>
  );
};

const areEqual = (prevProps, nextProps) => {
  if (prevProps.item.value === nextProps.item.value) {
    return true;
  }
  return false;
};

export default memo(SPText, areEqual);
