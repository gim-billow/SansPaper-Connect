import React from 'react';
import {Text} from 'react-native';
import styles from './styles';
import ItemWrapper from '../ItemWrapper';

const Label = (props) => {
  const {label} = props.item;
  return (
    <ItemWrapper>
      <Text style={styles.text}>{label}</Text>
    </ItemWrapper>
  );
};

export default Label;
