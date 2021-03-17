import React from 'react';
import {Text, View} from 'react-native';
import HTML from 'react-native-render-html';

import styles from './styles';
import ItemWrapper from '../ItemWrapper';
import {commonStyles} from '@styles/common';

const Label = (props) => {
  const {label, id} = props.item;

  return (
    <ItemWrapper>
      <View style={styles.container}>
        {/<\/?[a-z][\s\S]*>/i.test(label) ? (
          <View style={styles.htmlContainer}>
            <HTML key={id} html={label} />
          </View>
        ) : (
          <Text style={commonStyles.text}>{label}</Text>
        )}
      </View>
    </ItemWrapper>
  );
};

export default Label;
