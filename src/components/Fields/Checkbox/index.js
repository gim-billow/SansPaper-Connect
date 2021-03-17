import React, {useState, memo, useEffect, useCallback} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {Divider} from 'react-native-elements';

import ItemWrapper from '../ItemWrapper';
import styles from './styles';
import {darkRed, white} from 'styles/colors';
import {commonStyles} from '@styles/common';
import {limitText} from '@util/string';

const Checkbox = (props) => {
  const {item, updateFieldsValue} = props;
  const [toggleCheckBox, setToggleCheckBox] = useState(false);

  useEffect(() => {
    onToggleCheckBox(toggleCheckBox);
  }, [onToggleCheckBox, toggleCheckBox]);

  const onToggleCheckBox = useCallback(
    (value) => {
      const checkboxVal = value ? '1' : '0';
      updateFieldsValue({rank: item.rank, value: checkboxVal});
    },
    [item.rank, updateFieldsValue],
  );

  return (
    <ItemWrapper>
      <View style={styles.topContainer}>
        <TouchableOpacity onPress={() => setToggleCheckBox(!toggleCheckBox)}>
          <View style={styles.box} pointerEvents="none">
            <CheckBox
              disabled={false}
              onTintColor="transparent"
              value={toggleCheckBox}
              tintColors={{
                true: darkRed,
              }}
              onCheckColor={white}
              onFillColor={darkRed}
              onValueChange={() => {}}
            />
            <Text style={commonStyles.text}>{item.label}</Text>
          </View>
        </TouchableOpacity>
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

export default memo(Checkbox, areEqual);
