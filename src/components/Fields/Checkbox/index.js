import React, {useState} from 'react';
import {Text, View} from 'react-native';
import ItemWrapper from '../ItemWrapper';
import CheckBox from '@react-native-community/checkbox';

import styles from './styles';

const Checkbox = (props) => {
  const [toggleCheckBox, setToggleCheckBox] = useState(false);

  const {item, updateFieldsValue} = props;

  const onToggleCheckBox = (value) => {
    setToggleCheckBox(value);
    const checkboxVal = value ? '1' : '0';
    updateFieldsValue({rank: item.rank, value: checkboxVal});
  };

  return (
    <ItemWrapper>
      <View style={styles.box}>
        <CheckBox
          disabled={false}
          value={toggleCheckBox}
          onValueChange={(newValue) => onToggleCheckBox(newValue)}
        />
        <Text style={styles.text}>{item.label}</Text>
      </View>
    </ItemWrapper>
  );
};

export default Checkbox;
