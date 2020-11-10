import {View} from 'react-native';
import React from 'react';
import styles from './styles';

const ItemWrapper = (props) => {
  return <View style={styles.container}>{props.children}</View>;
};

export default ItemWrapper;
