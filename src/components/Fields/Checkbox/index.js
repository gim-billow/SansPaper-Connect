/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import CheckB from '@react-native-community/checkbox';

import styles from './styles';
import {darkRed, white} from 'styles/colors';
import {commonStyles} from '@styles/common';

const Checkbox = (props) => {
  const {
    item,
    updateFieldsValue,
    isEditable,
    draftFormHasChanges,
    draftId,
  } = props;
  const [toggleCheckBox, setToggleCheckBox] = useState(false);

  useEffect(() => {
    const {value} = item;

    if (value) {
      const toggleVal = value === '0' ? false : true;
      setToggleCheckBox(toggleVal);
    }
  }, []);

  const onToggleCheckBox = (value) => {
    if (draftId) draftFormHasChanges(true);
    setToggleCheckBox(value);
    const checkboxVal = value ? '1' : '0';
    updateFieldsValue({rank: item.rank, value: checkboxVal});
  };

  return (
    <>
      <View style={styles.topContainer}>
        <TouchableOpacity
          onPress={() => onToggleCheckBox(!toggleCheckBox)}
          disabled={!isEditable}>
          <View style={styles.box} pointerEvents="none">
            <CheckB
              onTintColor="transparent"
              value={toggleCheckBox}
              tintColors={{
                true: darkRed,
              }}
              onCheckColor={white}
              onFillColor={darkRed}
            />
            <Text style={[commonStyles.text, {marginLeft: 20}]}>
              {item.label}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default Checkbox;
