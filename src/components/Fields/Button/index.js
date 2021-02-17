import React from 'react';
import {Text, View} from 'react-native';
import {Button as RNButton} from 'react-native-paper';
import ItemWrapper from '../ItemWrapper';
import styles from './styles';

const Button = (props) => {
  const {item} = props;

  return (
    <ItemWrapper>
      <Text style={styles.label}>{item.label}</Text>
      <View style={styles.button}>
        <RNButton
          mode="contained"
          disabled={item.label.includes('new') ? true : false}
          style={item.label.includes('new') ? null : styles.buttonColor}
          onPress={() => {}}>
          <Text style={styles.text}>{item.label}</Text>
        </RNButton>
      </View>
    </ItemWrapper>
  );
};

export default Button;
