import React, {useState} from 'react';
import {Text, View} from 'react-native';
import ItemWrapper from '../ItemWrapper';
import {ToggleButton} from 'react-native-paper';

import styles from './styles';

const Checkbox = (props) => {
  const [tick, setTick] = useState(false);
  const {item, updateFieldsValue} = props;

  const updateCheckboxVal = () => {
    setTick(!tick);
    const checkboxVal = tick ? '1' : '0';
    console.log('ckbox', checkboxVal);
    updateFieldsValue({rank: item.rank, value: checkboxVal});
  };

  return (
    <ItemWrapper>
      <Text style={styles.text}>{item.label}</Text>
      <ToggleButton.Row
        style={styles.box}
        onValueChange={(val) => {
          if (val) {
            setTick(val);
            updateCheckboxVal();
          }
        }}
        value={tick}>
        <ToggleButton
          style={[styles.toggle, tick === 1 + '' ? styles.checked : null]}
          value="1"
        />
        <ToggleButton
          style={[
            styles.toggle,
            tick === 1 + '' ? styles.checkedii : styles.unchecked,
          ]}
          value="0"
        />
      </ToggleButton.Row>
    </ItemWrapper>
  );
};

export default Checkbox;
