import React, {memo} from 'react';
import {Text, View} from 'react-native';
import {Button as RNButton} from 'react-native-paper';
import {Divider} from 'react-native-elements';
import {commonStyles} from '@styles/common';
import ItemWrapper from '../ItemWrapper';
import styles from './styles';

const Button = (props) => {
  const {item, isEditable} = props;

  return (
    <ItemWrapper>
      <View style={styles.container}>
        <Text style={commonStyles.text}>{item.label}</Text>
        <View style={styles.button}>
          <RNButton
            mode="contained"
            disabled={!isEditable && item.label.includes('new') ? true : false}
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
