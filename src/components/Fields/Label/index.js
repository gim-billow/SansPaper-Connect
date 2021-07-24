import React from 'react';
import {Text, View} from 'react-native';
import HTML from 'react-native-render-html';

import styles from './styles';
import {commonStyles} from '@styles/common';

const Label = (props) => {
  const {label, id} = props.item;

  return (
    <>
      <View style={styles.container}>
        {/<\/?[a-z][\s\S]*>/i.test(label) ? (
          <View>
            <HTML key={id} html={label} />
          </View>
        ) : (
          <Text style={commonStyles.title}>{label}</Text>
        )}
      </View>
    </>
  );
};

export default Label;
