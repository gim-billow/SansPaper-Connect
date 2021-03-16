import React, {memo} from 'react';
import {Text, View} from 'react-native';
import {Button as RNButton, Divider} from 'react-native-paper';
import {commonStyles} from '@styles/common';
import ItemWrapper from '../ItemWrapper';
import styles from './styles';

const Button = (props) => {
  const {item} = props;

  return (
    <ItemWrapper>
      <View style={styles.container}>
        <Text style={commonStyles.text}>{item.label}</Text>
        <View style={styles.button}>
          <RNButton
            mode="contained"
            disabled={item.label.includes('new') ? true : false}
            style={item.label.includes('new') ? null : styles.buttonColor}
            onPress={() => {}}>
            <Text style={styles.text}>{item.label}</Text>
          </RNButton>
        </View>
      </View>
      <Divider />
    </ItemWrapper>
  );
};

export default memo(Button);
