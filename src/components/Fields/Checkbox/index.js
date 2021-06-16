import React, {useState, useEffect} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import CheckB from '@react-native-community/checkbox';
import {Divider} from 'react-native-elements';

import ItemWrapper from '../ItemWrapper';
import styles from './styles';
import {darkRed, white} from 'styles/colors';
import {commonStyles} from '@styles/common';

const Checkbox = (props) => {
  const {item, updateFieldsValue, isEditable} = props;
  const [toggleCheckBox, setToggleCheckBox] = useState(false);

  useEffect(() => {
    const {value} = item;

    if (value) {
      const toggleVal = value === '0' ? false : true;
      setToggleCheckBox(toggleVal);
    }
  }, []);

  const onToggleCheckBox = (value) => {
    setToggleCheckBox(value);
    const checkboxVal = value ? '1' : '0';
    updateFieldsValue({rank: item.rank, value: checkboxVal});
  };

  return (
    <ItemWrapper>
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
              onChange={() => {}}
            />
            <Text style={commonStyles.text}>{item.label}</Text>
          </View>
        </TouchableOpacity>
      </View>
      <Divider />
    </ItemWrapper>
  );
};

export default Checkbox;
